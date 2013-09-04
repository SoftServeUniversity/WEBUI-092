class Course < ActiveRecord::Base
  attr_accessible :faculty_id, :name, :year_of_start
  belongs_to :faculty
  has_many :groups

  has_one :progress_change, :as => :progressable

  def serializable_hash(options={}) 
    hash_info = super(options) 
    hash_info[:progress] = 0
    hash_info[:progress] = ProgressChange.where("progress_changes.progressable_type = 'course'").last.progress if progress_change
    hash_info
  end
end
