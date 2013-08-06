# Read about factories at https://github.com/thoughtbot/factory_girl

FactoryGirl.define do
  factory :progress_change do
    progress 1
    entity_id 1
    table_id 1
  end
end
