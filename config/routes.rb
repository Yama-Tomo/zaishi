Rails.application.routes.draw do
  devise_for :user, controllers: {
    omniauth_callbacks: 'users/omniauth_callbacks'
  }

  namespace :api do
    namespace :v1 do
      resources :histories, only: [:index], defaults: { format: :json }
      resources :genres, only: [:index], defaults: { format: :json }
      resources :monthly, only: [:index], defaults: { format: :json }
    end
  end

  get 'index', to: 'index#index', as: 'user_root'
  root to: 'index#index'
end
