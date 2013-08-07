Webui92::Application.routes.draw do
  resources :progress_changes


  resources :tasks


  resources :works


  resources :groups


  resources :courses


  resources :departments


  resources :faculties


  authenticated :user do
    root :to => 'home#index'
  end
  root :to => "home#index"
  devise_for :users
  resources :users
end