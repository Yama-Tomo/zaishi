# Zaishi

Zaishi shows money use histories application.

powerd by [Zaim API](https://dev.zaim.net/)

**Requirements**

- ruby 2.4.1

- node (>= 6.10.2)

# install

```
$ bundle install

$ npm install

$ bundle exec rake bower:install
```

# Configuration API token

create `.env` file to Rails.root

```
ZAIM_API_CONSUMER_KEY='YOUR APP CONSUMER KEY'
ZAIM_API_SECRET_KEY='YOUR APP SECRET KEY'
```

# deployment to heroku

```
$ heroku config:set RACK_ENV=heroku RAILS_ENV=heroku
$ heroku config:set SECRET_KEY_BASE=`RAILS_ENV=heroku bundle exec rake secret`
$ heroku config:set DEVISE_SECRET_KEY=`RAILS_ENV=heroku bundle exec rake secret`
$ heroku config:set ZAIM_API_CONSUMER_KEY=YOUR APP CONSUMER KEY
$ heroku config:set ZAIM_API_SECRET_KEY=YOUR APP SECRET KEY
$ heroku buildpacks:add --index 1 heroku/nodejs
$ heroku buildpacks:add --index 2 heroku/ruby
$ heroku run:detached rake db:migrate  RAILS_ENV=heroku
```