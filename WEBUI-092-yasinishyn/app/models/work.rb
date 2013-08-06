class Work < ActiveRecord::Base
  attr_accessible :name, :progress, :student_id

  belongs_to :student
  has_many :tasks
end
