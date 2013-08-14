class Course < ActiveRecord::Base
  attr_accessible :faculty_id, :name, :percentage, :year_of_start
  belongs_to :faculty
  has_many :groups
end
