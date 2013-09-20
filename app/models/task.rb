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
    @new_progress = TaskProgress.create(progress: rand(99), task_id: self.id)
    TaskChange.create(task_id: self.id, task_progress_id: @new_progress.id, task_comment: "Створено нове завдання")
  end
  def progresses_by_month
    @task_progresses = TaskProgress.where(task_id: self.id)
    counter = 0
    data = [nil]*12
    @task_progresses.sort_by!{ |elem| elem['created_at'] }  
    @task_progresses.each_with_index do |item, index|
      newIndex = index + 1
      month = item['created_at'].to_s.split('-')[1].to_i
      if newIndex == @task_progresses.length 
        data[month-1] = item["progress"]
        break
      end
      prevmonth = @task_progresses[newIndex]["created_at"].to_s.split('-')[1].to_i
        unless month == prevmonth
            data[month-1] = item["progress"]
            counter = counter + 1
        end
    end
    data
  end
  def aggregate
    #puts task_progresses.average('progress')
    avg = task_progresses.average('progress')
    puts avg
    avg.to_i
  end
end
