# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)
# Environment variables (ENV['...']) can be set in the file config/application.yml.
# See http://railsapps.github.io/rails-environment-variables.html
puts 'ROLES'
YAML.load(ENV['ROLES']).each do |role|
  Role.find_or_create_by_name({ :name => role }, :without_protection => true)
  puts 'role: ' << role
end

puts 'DEFAULT USERS 1'
user = User.find_or_create_by_email :name => ENV['ADMIN_NAME'].dup, :email => ENV['ADMIN_EMAIL'].dup, :password => ENV['ADMIN_PASSWORD'].dup, :password_confirmation => ENV['ADMIN_PASSWORD'].dup
puts 'user: ' << user.name
user.add_role :admin

puts 'DEFAULT USERS 2'
usr = User.find_or_create_by_email :name => ENV['ADMIN_NAME'].dup, :email => ENV['STUDENT_EMAIL'].dup, :password => ENV['ADMIN_PASSWORD'].dup, :password_confirmation => ENV['ADMIN_PASSWORD'].dup
puts 'usr: ' << usr.name
user.add_role :teacher


#Users table
#if User.all.empty?
#  s = 'User_ABC'
#  9.times do |time| 
#    fc = User.create! name: (s.next! + time.to_s)
#    puts 'created '<< fc.name
#  end
#end

#Faculty Table
if Faculty.all.empty?
  s = 'Faculty of Science ABC'
  9.times do |time| 
    fc = Faculty.create! name: (s.next! + time.to_s), user_id: User.first.id
    puts 'created '<< fc.name
  end
end

#Department Table
if Department.all.empty?
  s = 'Department_ABC'
  10.times do |time| 
    dp = Department.create! name: (s.next! + time.to_s), faculty_id: Faculty.first.id, user_id: User.first.id
    puts 'created '<< dp.name
  end
end

#Course Table
if Course.all.empty?
  s = 'Course_ABC'
  10.times do |time| 
    d = Course.create! name: (s.next! + time.to_s), year_of_start: "2012-02-01", faculty_id: Faculty.first.id
    puts 'created '<< d.name
  end
end

#Teachers Table
#if Teacher.all.empty?
#  s = 'Teacher_ABC'
#  9.times do |time| 
#    fc = Teacher.create! name: (s.next! + time.to_s)
#    puts 'created '<< fc.name
#  end
#end
tchr = Teacher.create user_id: User.first.id, department_id: Department.first.id, degree: 'PhD', title: 'Proffesor'


#Group Table
if Group.all.empty?
  s = 'Group_ABC'
  10.times do |time| 
    d = Group.create! name: (s.next! + time.to_s), course_id: Course.first.id, department_id: Department.first.id, teacher_id: Teacher.first.id
    puts 'created '<< d.name
  end
end


#Student Table
#if Student.all.empty?
#  s = 'Student_ABC'
#  9.times do |time| 
#    fc = Student.create! last_name: (s.next! + time.to_s)
#    puts 'created '<< fc.last_name
#  end
#end
stud = Student.create user_id: User.last.id, group_id: Group.first.id
stud1 = Student.create user_id: User.first.id, group_id: Group.last.id


#Works Table
if Work.all.empty?
  s = 'Work_ABC'
  10.times do |time| 
    d = Work.create! name: (s.next! + time.to_s), student_id: Student.last.id, teacher_id: Teacher.last.id
    puts 'created '<< d.name
  end
end

#Task Table
if Task.all.empty?
  s = 'Task_ABC'
  10.times do |time| 
    d = Task.create! name: (s.next! + time.to_s), priority: 0, work_id: Work.all[rand(10)].id
    puts 'created '<< d.name
  end

#Populate Progress
p = ProgressChange.new
p.save
p.aggregate
p.delete
