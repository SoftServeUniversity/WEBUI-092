class Faculty < ActiveRecord::Base
  
  attr_accessible :name, :user_id

  validates :name, length: { in: 1...100 }

  belongs_to :user
  has_many :departments
  has_many :courses

  has_many :groups, :through => :departments
  has_many :teachers, :through => :departments

  has_many :progress_changes, :as => :progressable

  def serializable_hash(options={}) 
    hash_info = super(options) 
    hash_info[:progress] = 0
    hash_info[:progress] = progress_changes.last.progress if progress_changes.last
    hash_info
  end

  def aggregate()
    arr0 = self.courses.to_a
    arr1 = self.departments.to_a
    res = 0
    res1 = 0
    if (arr0.empty? == false)
      arr0.each { |a| res += a.aggregate.to_i }
      #puts arr0.length
      puts res
      res = res/arr0.length
    end
    if(arr1.empty? == false)
      #second array
      arr1.each { |a| res1 += a.aggregate.to_i }
      #puts arr1.length
      puts res1
      res1 = res1/arr1.length
    end
      res = (res + res1)/2
    p = ProgressChange.create! progressable_id: self.id, progressable_type: self.class.name, progress: res
    return res
  end

end
