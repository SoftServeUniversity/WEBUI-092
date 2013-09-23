class TaskChange < ActiveRecord::Base
  attr_accessible :task_comment, :user_id, :task_id, :task_progress_id
  belongs_to :task, dependent: :destroy
  belongs_to :task_progress
  belongs_to :user

  before_create :set_last_progress

  def set_last_progress
  	self.task_progress_id = TaskProgress.where(task_id: self.task_id).last.id
  end
  def progress
    TaskProgress.find(task_progress_id).progress.to_i
  end
end