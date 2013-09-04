class Teacher < ActiveRecord::Base
  attr_accessible :degree, :department_id, :title, :user_id

  validates :degree, :department_id, :title, presence: true

  belongs_to :user
  belongs_to :department
  has_many :works

  after_create :add_panding_role
  has_many :progress_changes, :as => :progressable

  #all new users with 'teacher' assoction present, will automaticly have role_panding => true
  def add_panding_role
    self.user.add_role :teacher
    self.user.role_pending = true
    self.user.save
  end

  def serializable_hash(options={}) 
    hash_info = super(options) 
    hash_info[:name] = user.name
    hash_info[:last_name] = user.last_name
    hash_info[:middle_name] = user.middle_name
    hash_info[:email] = user.email
    hash_info[:department_name] = department.name
    hash_info[:progress] = 0
    hash_info[:progress] = progress_changes.last.progress if progress_changes.last
    hash_info
  end

  def aggregate
    self.works.aggregate
  end

end
