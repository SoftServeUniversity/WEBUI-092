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
puts 'DEFAULT USERS'
user = User.find_or_create_by_email :name => ENV['ADMIN_NAME'].dup, :email => ENV['ADMIN_EMAIL'].dup, :password => ENV['ADMIN_PASSWORD'].dup, :password_confirmation => ENV['ADMIN_PASSWORD'].dup
puts 'user: ' << user.name
user.add_role :admin

   dep_names = [
        "Кафедра прикладної математики(ПМ)",
        "Кафедра геодезії(КГ)",
        "Кафедра міжнародних відносин(МВ)",
        "Кафедра економіки(КЕ)",
        "Кафедра комп'ютерних наук (КН)",
        "Кафедра комп'ютерної інженерії (КІ)",
        "Кафедра програмної інженерії (ПІ)",
        "Кафедра математичних методів в інженерії (МН)",
        "Кафедра інформатики і математичного моделювання (ММ)"
   ]

   if Department.all.empty?
     9.times do |time|
       percentage = rand(20..90)
       department = Department.create! name: " #{dep_names[time]}", faculty_id:"#{time}", percentage: "#{percentage}"
       puts 'created new test department ' << department.name
     end
   end


     course_names = [
            "1 курс",
            "4 курс",
            "2 курс",
            "3 курс",
            "5 курс",
       ]

       if Course.all.empty?
         5.times do |time|
           percentage = rand(20..90)
           course = Course.create! name: " #{course_names[time]}", faculty_id:"#{time}", percentage: "#{percentage}"
           puts 'created new test course ' << course.name
         end
       end

         group_names = [
             "АМ-31",
             "КІ-22",
             "ЄМ-21",
             "АПТ-53",
             "КН-42",
         ]

                if Group.all.empty?
                  5.times do |time|
                    percentage = rand(0..100)
                    group = Group.create! name: " #{group_names[time]}", percentage: "#{percentage}"
                    puts 'created new test group ' << group.name
                  end
                end

