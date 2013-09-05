class Department < ActiveRecord::Base
  attr_accessible :faculty_id, :name, :user_id

  #has_one :head, class_name: 'User', foreign_key: :department_id
  validates :name, length: { in: 1...256 }
  validates :faculty_id, presence: true
  #validates :name, format: { whith: /[\w\s'",.а-яіїґ-—]{1,256}/i, message: 'some message' }

  belongs_to :faculty
  has_many :teachers
  has_many :progress_changes, :as => :progressable

  def serializable_hash(options={}) 
    hash_info = super(options) 
    hash_info[:progress] = 0
    hash_info[:progress] = progress_changes.last.progress if progress_changes.last
    hash_info
  end

  def self.search(faculty)
    where(faculty_id: faculty)
  end

  def aggregate
    arr = self.teachers.to_a
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