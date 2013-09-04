class Faculty < ActiveRecord::Base
  attr_accessible :name, :user_id

  validates :name, length: { in: 1...45 }

  belongs_to :user
  has_many :departments
  has_many :courses
  has_many :progress_changes, :as => :progressable

  def serializable_hash(options={}) 
    hash_info = super(options) 
    hash_info[:progress] = 0
    hash_info[:progress] = progress_changes.last.progress if progress_changes.last
    hash_info
  end

  def aggregate()
    arr = self.departments.to_a
    res = 0
    if (arr.empty? == false)
      arr.each { |a| res += a.aggregate.to_i }
      puts arr.length
      res = res/arr.length
      puts res
      p = ProgressChange.create! progressable_id: self.id, progressable_type: self.class.name, progress: res
    end
      return res
  end

end
