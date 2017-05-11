class Api::V1::HistoriesController < ApplicationController
  include ApiBase

  def index
    api_proc do
      date_format = '%Y/%m'

      if params[:month].nil?
        base_time = Time.now
        next_month = nil
      else 
        base_time = Time.parse(params[:month])

        if Time.now.strftime(date_format) > base_time.strftime(date_format)
          next_month = (base_time + 1.month).strftime(date_format) 
        end
      end

      limit = ENV['API_PAGE_LIMIT'].nil? ? 100 : ENV['API_PAGE_LIMIT'].to_i
      options = {
        mapping: 1,
        end_date: base_time.end_of_month.strftime('%Y-%m-%d'),
        limit: limit,
        page: params[:page].nil? ? 1 : params[:page],
        lang: 'ja',
        access_token: current_user[:access_token],
        access_secret: current_user[:access_secret]
      }

      if params[:date].present?
        # specfic date search
        options[:end_date] = options[:start_date] = Time.parse(params[:date]).strftime('%Y-%m-%d')
      end
      options[:genre_id] = params[:genre] if params[:genre].present?

      histories = History.find(options) 
      histories['loaded'] = histories['money'].size < limit ? true : false

      {
        month: {
          prev: (base_time - 1.month).strftime(date_format),
          current: base_time.strftime(date_format),
          next: next_month
        }
      }.merge histories
    end
  end
end
