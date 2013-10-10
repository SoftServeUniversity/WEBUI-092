class TaskProcess < ActiveRecord::Base
  include DbConnector
  
  attr_accessible :process
  belongs_to :task_change, dependent: :destroy
end