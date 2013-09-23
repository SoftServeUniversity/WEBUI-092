class TaskChange < ActiveRecord::Base
  attr_accessible :task_comment, :user_id, :task_id, :task_progress_id
  belongs_to :task, dependent: :destroy
  belongs_to :task_progress, dependent: :destroy
  belongs_to :user, dependent: :destroy

  before_create :set_last_progress
  def serializable_hash(options={}) 
    hash_info = super(options) 
    hash_info[:progress] = self.progress
    hash_info
  end

  def set_last_progress
  	self.task_progress_id = TaskProgress.where(task_id: self.task_id).last.id
  end
  def progress
    TaskProgress.find(task_progress_id).progress.to_i
  end
end