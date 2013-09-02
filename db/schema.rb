# encoding: UTF-8
# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended to check this file into your version control system.

ActiveRecord::Schema.define(:version => 20130828124205) do

  create_table "courses", :force => true do |t|
    t.string   "name"
    t.date     "year_of_start"
    t.integer  "faculty_id"
    t.datetime "created_at",    :null => false
    t.datetime "updated_at",    :null => false
    t.integer  "progress"
  end

  create_table "departments", :force => true do |t|
    t.string   "name"
    t.integer  "user_id"
    t.integer  "faculty_id"
    t.datetime "created_at", :null => false
    t.datetime "updated_at", :null => false
    t.integer  "progress"
  end

  add_index "departments", ["faculty_id"], :name => "index_departments_on_faculty_id"

  create_table "faculties", :force => true do |t|
    t.string   "name"
    t.integer  "user_id"
    t.datetime "created_at", :null => false
    t.datetime "updated_at", :null => false
  end

  add_index "faculties", ["user_id"], :name => "index_faculties_on_user_id"

  create_table "groups", :force => true do |t|
    t.string   "name"
    t.integer  "course_id"
    t.integer  "department_id"
    t.integer  "teacher_id"
    t.datetime "created_at",    :null => false
    t.datetime "updated_at",    :null => false
  end

  add_index "groups", ["course_id"], :name => "index_groups_on_course_id"
  add_index "groups", ["department_id"], :name => "index_groups_on_department_id"
  add_index "groups", ["teacher_id"], :name => "index_groups_on_teacher_id"

  create_table "progress_changes", :force => true do |t|
    t.integer  "progress"
    t.integer  "entity_id"
    t.integer  "table_id"
    t.datetime "created_at", :null => false
    t.datetime "updated_at", :null => false
  end

  create_table "roles", :force => true do |t|
    t.string   "name"
    t.integer  "resource_id"
    t.string   "resource_type"
    t.datetime "created_at",    :null => false
    t.datetime "updated_at",    :null => false
  end

  add_index "roles", ["name", "resource_type", "resource_id"], :name => "index_roles_on_name_and_resource_type_and_resource_id"
  add_index "roles", ["name"], :name => "index_roles_on_name"

  create_table "students", :force => true do |t|
    t.integer  "user_id"
    t.integer  "group_id"
    t.datetime "created_at",                      :null => false
    t.datetime "updated_at",                      :null => false
    t.boolean  "group_pending", :default => true
  end

  add_index "students", ["group_id"], :name => "index_students_on_group_id"
  add_index "students", ["user_id"], :name => "index_students_on_user_id"

  create_table "table_dictionaries", :force => true do |t|
    t.string   "name"
    t.datetime "created_at", :null => false
    t.datetime "updated_at", :null => false
  end

  create_table "task_changes", :force => true do |t|
    t.integer  "task_id"
    t.integer  "user_id"
    t.integer  "task_progress_id"
    t.text     "task_comment"
    t.datetime "created_at",       :null => false
    t.datetime "updated_at",       :null => false
  end

  add_index "task_changes", ["task_id"], :name => "index_task_changes_on_task_id"
  add_index "task_changes", ["task_progress_id"], :name => "index_task_changes_on_task_progress_id"

  create_table "task_progresses", :force => true do |t|
    t.integer  "progress"
    t.integer  "task_id"
    t.datetime "created_at", :null => false
    t.datetime "updated_at", :null => false
  end

  add_index "task_progresses", ["task_id"], :name => "index_task_progresses_on_task_id"

  create_table "tasks", :force => true do |t|
    t.string   "name"
    t.integer  "work_id"
    t.integer  "priority"
    t.datetime "created_at", :null => false
    t.datetime "updated_at", :null => false
  end

  add_index "tasks", ["work_id"], :name => "index_tasks_on_work_id"

  create_table "teachers", :force => true do |t|
    t.integer  "user_id"
    t.integer  "department_id"
    t.string   "degree"
    t.string   "title"
    t.datetime "created_at",    :null => false
    t.datetime "updated_at",    :null => false
    t.integer  "teacher_id"
  end

  add_index "teachers", ["department_id"], :name => "index_teachers_on_department_id"
  add_index "teachers", ["teacher_id"], :name => "index_teachers_on_teacher_id"
  add_index "teachers", ["user_id"], :name => "index_teachers_on_user_id"

  create_table "thesis_changes", :force => true do |t|
    t.string   "action"
    t.string   "user_name"
    t.string   "value"
    t.integer  "auditable_id"
    t.string   "auditable_type"
    t.datetime "created_at",     :null => false
    t.datetime "updated_at",     :null => false
  end

  create_table "users", :force => true do |t|
    t.string   "name",                   :default => "",    :null => false
    t.string   "last_name",              :default => "",    :null => false
    t.string   "middle_name",            :default => "",    :null => false
    t.string   "email",                  :default => "",    :null => false
    t.string   "encrypted_password",     :default => "",    :null => false
    t.string   "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.integer  "sign_in_count",          :default => 0
    t.datetime "current_sign_in_at"
    t.datetime "last_sign_in_at"
    t.string   "current_sign_in_ip"
    t.string   "last_sign_in_ip"
    t.datetime "created_at",                                :null => false
    t.datetime "updated_at",                                :null => false
    t.boolean  "role_pending",           :default => false
  end

  add_index "users", ["email"], :name => "index_users_on_email", :unique => true
  add_index "users", ["reset_password_token"], :name => "index_users_on_reset_password_token", :unique => true

  create_table "users_roles", :id => false, :force => true do |t|
    t.integer "user_id"
    t.integer "role_id"
  end

  add_index "users_roles", ["user_id", "role_id"], :name => "index_users_roles_on_user_id_and_role_id"

  create_table "works", :force => true do |t|
    t.string   "name"
    t.integer  "progress"
    t.integer  "student_id"
    t.datetime "created_at", :null => false
    t.datetime "updated_at", :null => false
  end

  add_index "works", ["student_id"], :name => "index_works_on_student_id"

end
