class Department < ActiveRecord::Base
  attr_accessible :faculty_id, :name, :user_id

  #has_one :head, class_name: 'User', foreign_key: :department_id
  
  validates :faculty_id, length: { in: 1...45 }
  validates :name, 		 length: { in: 1...45 }
  validates :user_id, 	 length: { in: 1...45 }

  belongs_to :faculty
end