class Course < ActiveRecord::Base
  attr_accessible :faculty_id, :name, :year_of_start
  belongs_to :faculty
  has_many :groups
end
