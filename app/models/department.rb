class Department < ActiveRecord::Base
  attr_accessible :faculty_id, :name, :user_id

  #has_one :head, class_name: 'User', foreign_key: :department_id
  validates :name, length: { in: 1...256 }
  validates :faculty_id, presence: true
  #validates :name, format: { whith: /[\w\s'",.а-яіїґ-—]{1,256}/i, message: 'some message' }

  belongs_to :faculty
  has_one :progress_change, :as => :progressable

  def serializable_hash(options={}) 
    hash_info = super(options) 
    hash_info[:progress] = 0
    hash_info[:progress] = progress_change.progress if progress_change
    hash_info
  end

  def self.search(faculty)
    where(faculty_id: faculty)
  end

  has_many :teachers
end