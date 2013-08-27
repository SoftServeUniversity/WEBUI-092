# Read about factories at https://github.com/thoughtbot/factory_girl

FactoryGirl.define do
  factory :thesis_change do
    type_of_entity "MyString"
    user_id 1
    value "MyString"
    type_of_change "MyString"
    work_id 1
  end
end
