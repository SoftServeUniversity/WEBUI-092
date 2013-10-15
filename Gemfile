source 'https://rubygems.org'

ruby '2.0.0'

gem 'rails',            '3.2.13'
gem 'mysql2'
gem 'backup'
gem 'delayed_job_active_record'
gem 'daemons'
gem 'unicorn-rails'
gem 'whenever', :require => false
gem 'jquery-rails'
gem 'bootstrap-sass'
gem 'cancan'
gem 'devise',           '3.0.0'
gem 'figaro'
gem 'rolify'
gem 'simple_form'
gem 'jbuilder',         '1.5.0'
gem 'unicorn'
gem 'capistrano'
gem 'ar-octopus', :require => 'octopus'

group :assets do
  gem 'sass-rails',     '~> 3.2.3'
  gem 'coffee-rails',   '~> 3.2.1'
  gem 'uglifier',       '>= 1.0.3'
  gem 'therubyracer'
end

group :development do
  gem 'better_errors'
  gem 'binding_of_caller'
  gem 'quiet_assets'
  gem 'rb-fchange', :require=>false
  gem 'rb-inotify', :require=>false
end

group :development, :test do
  gem 'factory_girl_rails'
  gem 'rspec-rails'
end

group :test do
  gem 'simplecov', :require => false
  gem 'capybara'
  gem 'database_cleaner'
  gem 'email_spec'
  gem 'launchy'
  gem 'guard-rspec'
  gem 'guard-bundler'
  gem 'guard-cucumber'
  gem 'guard-rails'
  gem 'guard-spork'
  gem 'growl'
  gem 'spork'
  gem 'rb-fsevent', '~> 0.9'
end
