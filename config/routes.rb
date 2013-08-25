Webui92::Application.routes.draw do

  resources :teachers


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
  devise_for :users, controllers: { sessions: 'user_sessions/sessions', registrations: 'user_registrations/registrations' }
  
  post 'user_helper/receive_current_user'
  post 'user_helper/role_pending'
end