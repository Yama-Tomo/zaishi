class Api::V1::MonthlyController < ApplicationController
  include ApiBase

  def index
    api_proc do
      if params[:month].nil?
        base_time = Time.now
      else 
        base_time = Time.parse(params[:month])
      end

      scope = params[:scope].present? ? params[:scope].split(',') : %w[money summary_of_daily ratio_by_genre total]

      limit = 100
      histories = {}
      1.upto(10) do |page|
        options = {
          mapping: 1,
          start_date: base_time.strftime('%Y-%m-01'),
          end_date: base_time.end_of_month.strftime('%Y-%m-%d'),
          limit: limit,
          page: page,
          lang: 'ja',
          access_token: current_user[:access_token],
          access_secret: current_user[:access_secret]
        }

        Rails.logger.debug "try #{page} times API call.."
        result = History.find(options)
        break if result['money'].blank?

        histories['money'] ||= []
        histories['money'].concat(result['money']) if result['money'].present?

        break if result['money'].size < limit
      end

      histories['summary_of_daily'], histories['total'] = summary histories['money']
      histories['ratio_by_genre'] = ratio_by_genre histories['money'], histories['total']

      histories.select { |k, v| scope.include? k }
    end
  end

  private

  def summary(histories)
    return {}, 0 if histories.nil?

    result = {}
    total = 0
    histories.each do |v|
      result[v['date']] ||= 0
      result[v['date']] += v['amount']
      total += v['amount']
    end

    return result.map { |k, v| [k, v.to_s(:delimited)] }.to_h, total
  end

  def ratio_by_genre(histories, total)
    return [] if histories.nil?

    summary = {}
    histories.each do |v|
      summary[v['genre_id']] ||= 0
      summary[v['genre_id']] += v['amount']
    end

    ratio_array = summary.map do |k, v|
      [k, BigDecimal.new(( v.to_f / total.to_f * 100).to_s).floor(2).to_f] 
    end.to_h
    # sort by desc
    Hash[ ratio_array.sort_by{ |_, v| -v } ].map { |k, v| {genre_id: k, ratio: v, sum: summary[k].to_s(:delimited)} }
  end
end
