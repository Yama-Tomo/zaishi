source 'https://rubygems.org'

git_source(:github) do |repo_name|
  repo_name = "#{repo_name}/#{repo_name}" unless repo_name.include?("/")
  "https://github.com/#{repo_name}.git"
end

ruby '2.4.1'

gem 'rails', '~> 5.1.0'
gem 'puma', '~> 3.7'
gem 'uglifier', '>= 1.3.0'
gem 'slim-rails'
gem 'jbuilder', '~> 2.5'
gem 'devise', git: 'https://github.com/gogovan/devise.git', branch: 'rails-5.1'
gem 'erubis'
gem 'omniauth'
gem 'omniauth-zaimv2', git: 'https://github.com/maar4569/omniauth-zaimv2'

gem 'sass-rails', '~> 5.0'
gem 'bootstrap-sass', '~> 3.3.6'
gem 'jquery-rails'
gem 'bower-rails'

group :heroku do
  gem 'pg'
  gem 'rails_12factor'
end

group :development, :test do
  gem 'byebug', platforms: [:mri, :mingw, :x64_mingw]
  gem 'capybara', '~> 2.13.0'
  gem 'selenium-webdriver'
end

group :development do
  gem 'web-console', '>= 3.3.0'
  gem 'listen', '>= 3.0.5', '< 3.2'
  gem 'spring'
  gem 'spring-watcher-listen', '~> 2.0.0'
  gem 'dotenv-rails'
  gem 'sqlite3'
end

