class Task < ActiveRecord::Base
  attr_accessible :name, :work_id

  belongs_to :work
end
