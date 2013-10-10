class FacultyAdmin < ActiveRecord::Base
  include DbConnector
  
  attr_accessible :user_id, :faculty_id, :user_attributes

  validates :faculty_id, presence: true

  belongs_to :user
  belongs_to :faculty

  after_create :add_panding_role

  accepts_nested_attributes_for :user


  def serializable_hash(options={}) 
    options.merge(:include => [:user])
    hash_info = super(options) 
    hash_info[:name] = user.name
    hash_info[:last_name] = user.last_name
    hash_info[:middle_name] = user.middle_name
    hash_info[:email] = user.email
    hash_info[:role_pending] = user.role_pending
    hash_info
  end


  #all new users with 'faculty_admin' association present, will automaticly have role_panding => true
  def add_panding_role
    self.user.add_role :faculty_admin
    self.user.role_pending = true
    self.user.save
  end

end