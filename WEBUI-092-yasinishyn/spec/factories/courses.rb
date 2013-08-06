# Read about factories at https://github.com/thoughtbot/factory_girl

FactoryGirl.define do
  factory :course do
    name "MyString"
    year_of_start "2013-08-02"
    faculty_id 1
  end
end
