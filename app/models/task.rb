class Task < ActiveRecord::Base
  attr_accessible :name, :work_id
  validates :name, presence: true
  belongs_to :work
end
