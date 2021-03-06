class User < ActiveRecord::Base
  
  rolify
  # Include default devise modules. Others available are:
  # :token_authenticatable, :confirmable,
  # :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable

  # Setup accessible (or protected) attributes for your model
  attr_accessible :role_ids, as: :admin
  attr_accessible :name, :email, :password, :password_confirmation, :remember_me, :last_name, :middle_name, :role_attributes, :student_attributes, :teacher_attributes, :faculty_admin_attributes, :role_pending
  
  has_one :faculty
  has_one :teacher
  has_one :student
  has_one :faculty_admin

  accepts_nested_attributes_for :teacher
  accepts_nested_attributes_for :student
  accepts_nested_attributes_for :faculty_admin

  #validations
  validates :email, uniqueness: true


  before_create :add_default_role

  def role_pending?
    role_pending
  end

  def add_role role, pending=false
    role_pending = pending # need to get role_pending trought self, bacause of receiver
    save
    remove_role :guest if has_role? :guest #user must have only one role
    roles << Role.find_by_name(role)
    reload
  end

  private
    def add_default_role
      roles << Role.find_by_name(:guest)
    end
  
end
