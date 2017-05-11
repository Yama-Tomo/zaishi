module ZaimModel
  extend ActiveSupport::Concern

  ZAIM_API_BASE = 'https://api.zaim.net/'.freeze

  def money_histories(params = {})
    call_zaim_api ZAIM_API_BASE + 'v2/home/money', params_to_s(params)
  end

  def genres(params = {})
    call_zaim_api ZAIM_API_BASE + 'v2/genre', params_to_s(params)
  end

  private

  def call_zaim_api(url, params = {})
    strategy = Devise.omniauth_configs[:ZaimV2].strategy
    consumer = OAuth::Consumer.new(strategy.consumer_key, strategy.consumer_secret, strategy.client_options)
    access_token = OAuth::AccessToken.new consumer, params.delete(:access_token), params.delete(:access_secret)

    Rails.logger.debug url + '?' + params.to_query
    response = access_token.get(url + '?' + params.to_query)

    case response
    when Net::HTTPSuccess
      json = JSON.parse response.body
    else
      raise response.body
    end
  end

  def params_to_s(params)
    params.map { |k, v| [k, v.to_s] }.to_h
  end
end
