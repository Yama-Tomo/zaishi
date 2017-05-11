class User < ApplicationRecord
  devise :database_authenticatable, :timeoutable, :trackable, :omniauthable, omniauth_providers: [:ZaimV2]

  def self.omniauth(auth)
    user = where(provider: auth['provider'], uid: auth['uid']).first_or_create do |user|
      user.provider = auth['provider']
      user.uid = auth['uid']
    end

    user.username      = auth['info']['name']
    user.profile_img   = auth['info']['profile_image_url']
    user.access_token  = auth['credentials']['token']
    user.access_secret = auth['credentials']['secret']
    user.save if user.changed?

    user
  end

  def self.new_with_session(params, session)
    if session['devise.user_attributes']
      new(session['devise.user_attributes'], without_protection: true) do |user|
        user.attributes = params
        user.valid?
      end
    else
      super
    end
  end
end
