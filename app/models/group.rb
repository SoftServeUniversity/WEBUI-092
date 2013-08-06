class Group < ActiveRecord::Base
  attr_accessible :course_id, :department_id, :name, :teacher_id

  belongs_to :course
  belongs_to :teacher
  belongs_to :department
end
