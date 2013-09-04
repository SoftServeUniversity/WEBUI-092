class Faculty < ActiveRecord::Base
  attr_accessible :name, :user_id

  validates :name, length: { in: 1...45 }

  belongs_to :user
  has_many :departments
  has_one :progress_change, :as => :progressable

  def serializable_hash(options={}) 
    hash_info = super(options) 
    hash_info[:progress] = 0
    hash_info[:progress] = ProgressChange.where("progress_changes.progressable_type = 'faculty'").last.progress if progress_change
    hash_info
  end

end
