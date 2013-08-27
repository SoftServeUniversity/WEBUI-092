class Task < ActiveRecord::Base
  attr_accessible :name, :work_id
 
  validates :name, :work_id,  presence: true
  validates :name, length: { in: 1..250 }
  
  belongs_to :work
  has_many :thesis_changes, :as => :auditable
end
