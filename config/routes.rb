Webui92::Application.routes.draw do

  get "backup/full_backup"
  get "backup/restore_from_backup"

  resources :table_dictionaries


  resources :progress_changes


  resources :tasks


  resources :works


  resources :groups


  resources :courses


  resources :departments


  resources :faculties

  get '/test', to: redirect('/app/tests/SpecRunner.html')
  authenticated :user do
    root :to => 'home#index'
  end
  root :to => "home#index"
  devise_for :users
  resources :users
end