class TaskChange < ActiveRecord::Base
  attr_accessible :task_comment, :user_id, :task_id, :task_process
  belongs_to :task
  belongs_to :user
  has_one :task_process
end