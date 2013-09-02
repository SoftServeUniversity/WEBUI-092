class Course < ActiveRecord::Base
  attr_accessible :faculty_id, :name, :year_of_start
  belongs_to :faculty
  has_many :groups

  # def serializable_hash(options={}) 
  # 	#options.merge(:include => [:user])
  #   #hash_info = super(options) 
  #   hash_info[:name] = name
  #   hash_info[:last_name] = user.last_name
  #   hash_info[:middle_name] = user.middle_name
  #   hash_info[:email] = user.email
  #   hash_info
  # end
end
