class Work < ActiveRecord::Base
  attr_accessible :name, :progress, :student_id, :teacher_id

  belongs_to :student
  belongs_to :teacher #curator
  has_many :tasks
  has_many :thesis_changes, :as => :auditable
  has_many :progress_changes, :as => :progressable

  #after_create :aggregate

 def serializable_hash(options={})
    hash_info = super(options)
    hash_info[:progress] = 0
    hash_info[:progress] = progress_changes.last.progress if progress_changes.last
    hash_info
  end

  def aggregate
  	arr = self.tasks.to_a
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
