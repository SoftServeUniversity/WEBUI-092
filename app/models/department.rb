class Department < ActiveRecord::Base
  attr_accessible :faculty_id, :name, :user_id

  #has_one :head, class_name: 'User', foreign_key: :department_id
  validates :name, length: { in: 1...256 }
  validates :faculty_id, presence: true
  #validates :name, format: { whith: /[\w\s'",.а-яіїґ-—]{1,256}/i, message: 'some message' }

  belongs_to :faculty
end