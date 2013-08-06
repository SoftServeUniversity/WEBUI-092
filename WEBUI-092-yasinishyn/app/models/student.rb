class Student < ActiveRecord::Base
  attr_accessible :group_id, :user_id

  has_many :works
end
