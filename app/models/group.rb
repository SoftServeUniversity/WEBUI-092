class Group < ActiveRecord::Base
  attr_accessible :course_id, :department_id, :name, :teacher_id

  belongs_to :course
  belongs_to :teacher
  belongs_to :department
  has_many :progress_changes, :as => :progressable
  #has_many :progress_changes

  def serializable_hash(options={}) 
    hash_info = super(options) 
    hash_info[:progress] = 0
    hash_info[:progress] = progress_changes.last.progress if progress_changes.last
    hash_info
  end
end
