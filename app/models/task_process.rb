class TaskProcess < ActiveRecord::Base
  attr_accessible :process
  belongs_to :task_change
end