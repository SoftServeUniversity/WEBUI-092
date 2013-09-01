class Work < ActiveRecord::Base
  attr_accessible :name, :progress, :student_id, :teacher_id

  belongs_to :student
  belongs_to :teacher #curator
  has_many :tasks
  has_many :thesis_changes, :as => :auditable

end
