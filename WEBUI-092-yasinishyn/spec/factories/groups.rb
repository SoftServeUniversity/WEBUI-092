# Read about factories at https://github.com/thoughtbot/factory_girl

FactoryGirl.define do
  factory :group do
    name "MyString"
    course_id 1
    department_id 1
    teacher_id 1
  end
end
