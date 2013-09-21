Webui92::Application.routes.draw do

  resources :teachers

  resources :students

  get "students/search"


  get "backup/full_backup"
  get "backup/restore_from_backup"


  resources :progress_changes
  get 'progresses_by_month/:task_id', to: 'task_progresses#progresses_by_month'
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
  
  resources :info


  authenticated :user do
    root :to => 'home#index'
  end


  root :to => "home#index"

  
  devise_for :users, controllers: { sessions: 'user_sessions/sessions', registrations: 'user_registrations/registrations' }

  
  post 'user_helper/receive_current_user'
  post 'user_helper/role_pending'
  post 'user_helper/return_current_role'
  post 'user_helper/populate_roles_select'
  post 'user_helper/receive_user_abilities'

  get '/users/get_faculty_admins' => "users#get_faculty_admins"

  get '/test', to: redirect('/app/tests/SpecRunner.html')
end