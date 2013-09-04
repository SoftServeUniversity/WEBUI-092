class Work < ActiveRecord::Base
  attr_accessible :name, :progress, :student_id, :teacher_id

  belongs_to :student
  belongs_to :teacher #curator
  has_many :tasks
  has_many :thesis_changes, :as => :auditable
  has_many :progress_changes, :as => :progressable

 def serializable_hash(options={}) 
    hash_info = super(options) 
    hash_info[:progress] = 0
    hash_info[:progress] = progress_changes.last.progress if progress_changes.last
    hash_info
  end
end
