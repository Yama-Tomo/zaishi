class Api::V1::GenresController < ApplicationController
  include ApiBase

  def index
    api_proc do
      options = {lang: 'ja'}
      options.merge! access_token: current_user[:access_token], access_secret: current_user[:access_secret]

      genres = Genre.find options
      genres['genres'].map { |v| [v['id'], v['name']] }.to_h
    end
  end
end
