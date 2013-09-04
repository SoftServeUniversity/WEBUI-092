class Student < ActiveRecord::Base
  attr_accessible :group_id, :user_id

  belongs_to :group
  belongs_to :user
  has_many :works
  has_many :progress_changes, :as => :progressable

  def serializable_hash(options={}) 
  	options.merge(:include => [:user])
    hash_info = super(options) 
    hash_info[:name] = user.name
    hash_info[:last_name] = user.last_name
    hash_info[:middle_name] = user.middle_name
    hash_info[:email] = user.email
    hash_info[:progress] = 0
    hash_info[:progress] = progress_changes.last.progress if progress_changes.last
    hash_info
  end

  def aggregate
    self.works.aggregate
  end

end
