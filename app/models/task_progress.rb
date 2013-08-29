class TaskProgress < ActiveRecord::Base
  attr_accessible :progress, :task_id
  has_many :task_changes
  belongs_to :task
end