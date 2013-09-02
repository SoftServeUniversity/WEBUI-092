class ProgressChange < ActiveRecord::Base
  attr_accessible :progressable_id, :progress, :progressable_type
  belongs_to :progressable, :polymorphic => true

end
