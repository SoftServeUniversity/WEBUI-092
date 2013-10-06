class TaskProcess < ActiveRecord::Base
  include OctopusConnector
  attr_accessible :process
  belongs_to :task_change, dependent: :destroy
end