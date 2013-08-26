class Work < ActiveRecord::Base
  attr_accessible :name, :progress, :student_id

  belongs_to :student
  has_many :tasks
  has_many :thesis_changes, :as => :auditable

end
