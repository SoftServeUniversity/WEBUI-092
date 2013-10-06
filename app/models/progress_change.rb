class ProgressChange < ActiveRecord::Base
  
  attr_accessible :progressable_id, :progress, :progressable_type
  belongs_to :progressable, :polymorphic => true

  def aggregate()
    arr = Faculty.all.to_a
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
