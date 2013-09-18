class Teacher < ActiveRecord::Base
  attr_accessible :degree, :department_id, :title, :user_id, :user_attributes

  validates :degree, :department_id, :title, presence: true

  belongs_to :user
  belongs_to :department
  has_many :works
  has_many :groups

  after_create :add_panding_role
  has_many :progress_changes, :as => :progressable

  accepts_nested_attributes_for :user

  #all new users with 'teacher' assoction present, will automaticly have role_panding => true
  def add_panding_role
    self.user.add_role :teacher
    self.user.role_pending = true
    self.user.save
  end

  def serializable_hash(options={})
    #options.merge(:include => [:user])
    hash_info = super(options)
    hash_info[:faculty_id] = self.department.faculty.id
    hash_info[:faculty_name] = self.department.faculty.name
    hash_info[:name] = user.name
    hash_info[:last_name] = user.last_name
    hash_info[:middle_name] = user.middle_name
    hash_info[:email] = user.email
    hash_info[:department_name] = department.name
    hash_info[:role_pending] = user.role_pending
    hash_info[:progress] = 0
    hash_info[:progress] = progress_changes.last.progress if progress_changes.last
    hash_info
  end

  def aggregate
    arr = self.works.to_a
    res = 0
    if (arr.empty? == false)
      arr.each { |a| res += a.aggregate.to_i }
      res = res/arr.length
      puts res
      p = ProgressChange.create! progressable_id: self.id, progressable_type: self.class.name, progress: res
    end
      return res
  end
end