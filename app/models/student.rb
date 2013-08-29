class Student < ActiveRecord::Base
  attr_accessible :group_id, :user_id

  has_many :works
  belongs_to :group
  belongs_to :user

  def serializable_hash(options={}) 
  	options.merge(:include => [:user])
    hash_info = super(options) 
    hash_info[:name] = user.name
    hash_info[:last_name] = user.last_name
    hash_info[:middle_name] = user.middle_name
    hash_info[:email] = user.email
    hash_info
  end

end
