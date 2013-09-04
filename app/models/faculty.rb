class Faculty < ActiveRecord::Base
  attr_accessible :name, :user_id

  validates :name, length: { in: 1...45 }

  belongs_to :user
  has_many :departments
  has_many :courses
  has_many :progress_changes, :as => :progressable

  def serializable_hash(options={}) 
    hash_info = super(options) 
    hash_info[:progress] = 0
    hash_info[:progress] = progress_changes.last.progress if progress_changes.last
    hash_info
  end

  def aggregate()
    self.find(params[:id]).courses.aggregate
  end

end
