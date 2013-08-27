Webui92::Application.routes.draw do

  get "backup/full_backup"
  get "backup/restore_from_backup"

  resources :table_dictionaries


  resources :progress_changes

  get '/tasks/:task_id/task_progresses', to: 'task_progresses#task_id_index'
  get '/tasks/:task_id/task_progress', to: 'task_progresses#task_id_show'
  resources :tasks
  resources :task_progresses
  resources :task_changes
  


  resources :works
  get 'work/:id/tasks', to: 'works#show_tasks'
  get 'work/:id/tasks/progresses', to: 'works#show_tasks_with_progresses'


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
end