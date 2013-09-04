class Group < ActiveRecord::Base
  attr_accessible :course_id, :department_id, :name, :teacher_id

  belongs_to :course
  belongs_to :teacher
  belongs_to :department
  has_one :progress_change, :as => :progressable
  #has_many :progress_changes

  def serializable_hash(options={}) 
    hash_info = super(options) 
    hash_info[:progress] = 0
    hash_info[:progress] = ProgressChange.where("progress_changes.progressable_type = 'group'").last.progress if progress_change
    hash_info
  end
end
