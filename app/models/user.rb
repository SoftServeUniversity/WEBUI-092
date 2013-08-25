class User < ActiveRecord::Base
  rolify
  # Include default devise modules. Others available are:
  # :token_authenticatable, :confirmable,
  # :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable

  # Setup accessible (or protected) attributes for your model
  attr_accessible :role_ids, as: :admin
  attr_accessible :name, :email, :password, :password_confirmation, :remember_me, :last_name, :middle_name, :role_attributes, :student_attributes, :teacher_attributes
  
  has_one :faculty
  has_one :teacher
  has_one :student

  accepts_nested_attributes_for :teacher
  accepts_nested_attributes_for :student

  def role_pending?
    role_pending
  end
  
end
