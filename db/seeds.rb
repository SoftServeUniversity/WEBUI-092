#default roles
puts 'ROLES'
YAML.load(ENV['ROLES']).each do |role|
  Role.find_or_create_by_name({ :name => role }, :without_protection => true)
  puts 'role: ' << role
end

#app admin
puts 'DEFAULT USERS 1'
user = User.find_or_create_by_email :name => 'Admin', :last_name => 'Admin', :middle_name => 'Admin', :email => 'user@example.com', :password => 'changeme', :password_confirmation => 'changeme'
puts 'created admin user: ' << user.name
user.add_role :admin

#app admin
puts 'DEFAULT USERS 1'
user = User.find_or_create_by_email :name => 'Faculty Admin', :last_name => 'Faculty Admin', :middle_name => 'Faculty Admin', :email => 'user2@example.com', :password => 'changeme', :password_confirmation => 'changeme'
puts 'created faculty admin user: ' << user.name
user.add_role :faculty_admin
user.reload

#default faculty
fc = Faculty.find_or_create_by_name!({name: 'Факультет прикладної математики та інформатики', user_id: user.id}, :without_protection => true)
puts 'created default faculty: '<< fc.name
fc.reload

#default Department
dp = Department.create! name: 'Кафедра інформаційних систем', faculty_id: fc.id
puts 'created default department: '<< dp.name

