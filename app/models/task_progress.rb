class TaskProgress < ActiveRecord::Base
  include OctopusConnector
  attr_accessible :progress, :task_id
  has_many :task_changes
  belongs_to :task, dependent: :destroy
end