class Task < ActiveRecord::Base
  attr_accessible :name, :work_id, :priority
 
  # validates :name, :work_id,  presence: true
  # validates :name, length: { in: 1..250 }
  
  belongs_to :work
  has_many :task_changes
  has_many :task_progresses
  has_many :thesis_changes, :as => :auditable
  
  after_create :create_progress_and_change
  def create_progress_and_change
    @new_progress = TaskProgress.create(progress: 0, task_id: self.id)
    TaskChange.create(task_id: self.id, task_progress_id: @new_progress.id, user_id: 1, task_comment: "Створено нове завдання")
  end
end
