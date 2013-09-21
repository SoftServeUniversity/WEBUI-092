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
user = User.find_or_create_by_email :name => ENV['ADMIN_NAME'].dup, :last_name => ENV['ADMIN_LAST_NAME'].dup, :middle_name => ENV['ADMIN_MIDDLE_NAME'].dup, :email => ENV['ADMIN_EMAIL'].dup, :password => ENV['ADMIN_PASSWORD'].dup, :password_confirmation => ENV['ADMIN_PASSWORD'].dup
puts 'user: ' << user.name
user.add_role :admin

# puts 'DEFAULT USERS 2'
# usr = User.find_or_create_by_email :name => ENV['STUDENT_NAME'].dup, :last_name => ENV['STUDENT_LAST_NAME'].dup, :middle_name => ENV['STUDENT_MIDDLE_NAME'].dup, :email => ENV['STUDENT_EMAIL'].dup, :password => ENV['ADMIN_PASSWORD'].dup, :password_confirmation => ENV['ADMIN_PASSWORD'].dup
# puts 'usr: ' << usr.name
# usr.add_role :teacher

#Create Users
if !(User.all.empty?)
  name = 'NameABC'
  last_name = "LastNameABC"
  middle_name = "MiddleNameABC"
  100.times do |time| 
    usr = User.create! name: (name + time.to_s), middle_name: (middle_name + time.to_s), last_name: (last_name + time.to_s), email: (name.next! + "@example.com"), password: (name + last_name + middle_name + '0'), password_confirmation: (name + last_name + middle_name + '0')
    puts 'Created'<< usr.name
  end
end



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
  s = 'Faculty of Applied Mathematics and Informatics'
  1.times do |time| 
    fc = Faculty.create! name: (s.next! + time.to_s), user_id: User.first.id
    puts 'created '<< fc.name
  end
end

#Department Table
if Department.all.empty?
  s = 'Department of ScienceABC'
  4.times do |time| 
    dp = Department.create! name: (s.next! + time.to_s), faculty_id: Faculty.first.id, user_id: User.first.id
    puts 'created '<< dp.name
  end
end

#Course Table
if Course.all.empty?
  s = 'Course '
  5.times do |time| 
    d = Course.create! name: (s.next! + time.to_s), year_of_start: "2012-02-01", faculty_id: Faculty.first.id
    puts 'created '<< d.name
  end
end

#Teachers Table
if Teacher.all.empty?
 5.times do |time| 
   tchr = Teacher.create! degree: 'PhD', title: 'Proffesor', user_id: time, department_id: 1
   puts 'created teacher'
 end
 5.times do |time| 
   tchr = Teacher.create! degree: 'PhD', title: 'Proffesor', user_id: time+5, department_id: 2
   puts 'created teacher'
 end
 5.times do |time| 
   tchr = Teacher.create! degree: 'PhD', title: 'Proffesor', user_id: time+10, department_id: 3
   puts 'created teacher'
 end
 5.times do |time| 
   tchr = Teacher.create! degree: 'PhD', title: 'Proffesor', user_id: time+15, department_id: 4
   puts 'created teacher'
 end
end
#tchr = Teacher.create user_id: User.first.id, department_id: Department.first.id, degree: 'PhD', title: 'Proffesor'


#Group Table
if Group.all.empty?
  s = 'Group PMI-'
  5.times do |time| 
    d = Group.create! name: (s.next! + time.to_s), course_id: time, department_id: 1, teacher_id: time
  end
  s = 'Group PMI-'
  5.times do |time| 
    d = Group.create! name: (s.next! + time.to_s), course_id: time, department_id: 2, teacher_id: time+5
  end
  s = 'Group PMI-'
  5.times do |time| 
    d = Group.create! name: (s.next! + time.to_s), course_id: time, department_id: 3, teacher_id: time+10
  end
  s = 'Group PMI-'
  5.times do |time| 
    d = Group.create! name: (s.next! + time.to_s), course_id: time, department_id: 4, teacher_id: time+20
  end
end


#Student Table
if Student.all.empty?
 s = 'Student_ABC'
 400.times do |time| 
   st = Student.create! user_id: (time + 20), group_id: rand(20) 
   puts 'created Student'
 end
end
#stud = Student.create user_id: User.last.id, group_id: Group.first.id
#stud1 = Student.create user_id: User.first.id, group_id: Group.last.id


#Works Table
if Work.all.empty?
  s = 'Work Number '
  4000.times do |time| 
    d = Work.create! name: (s + time.to_s), student_id: rand(400), teacher_id: rand(20)
    puts 'created '<< d.name
  end
end

#Task Table
if Task.all.empty?
  s = 'Task_ABC'
  8000.times do |time| 
    d = Task.create! name: (s.next! + time.to_s), priority: 0, work_id: Work.all[rand(4000)].id
    puts 'created '<< d.name
  end
end

# #Populate Progress Groups
#   10.times do |time| 
#     d = ProgressChange.create! progressable_id: time+1, progressable_type: "Group", progress: rand(79)
#   end
# #Populate Progress Course
#   10.times do |time| 
#     d = ProgressChange.create! progressable_id: time+1, progressable_type: "Course", progress: rand(69)
#   end
# #Populate Progress Department
#   10.times do |time| 
#     d = ProgressChange.create! progressable_id: time+1, progressable_type: "Department", progress: rand(79)
#   end
# #Populate Progress Faculty
#   10.times do |time| 
#     d = ProgressChange.create! progressable_id: time+1, progressable_type: "Faculty", progress: rand(59)
#   end
# #Populate Progress Works
#  10.times do |time| 
#     d = ProgressChange.create! progressable_id: time+1, progressable_type: "Work", progress: rand(89)
#   end
#Populate Progress
p = ProgressChange.new
p.save
p.aggregate


