class Group < ActiveRecord::Base
  attr_accessible :course_id, :department_id, :name, :teacher_id

  belongs_to :course
  belongs_to :teacher
  belongs_to :department
  has_many :students
  has_many :progress_changes, :as => :progressable
  #has_many :progress_changes

  def serializable_hash(options={})
    hash_info = super(options)
    hash_info[:progress] = 0
    hash_info[:progress] = progress_changes.last.progress if progress_changes.last
    hash_info
  end

  def aggregate
    arr = self.students.to_a
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
