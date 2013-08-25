class Teacher < ActiveRecord::Base
  attr_accessible :degree, :department_id, :title, :user_id

  validates :degree, :department_id, :title, presence: true

  belongs_to :user
  belongs_to :department

  after_create :add_panding_role

  #all new users with 'teacher' assoction present, will automaticly have role_panding => true
  def add_panding_role
    self.user.add_role :teacher
    self.user.role_pending = true
    self.user.save
  end

end
