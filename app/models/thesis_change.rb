class ThesisChange < ActiveRecord::Base
  attr_accessible :type, :user_id, :value

  belongs_to :historical, :polymorphic => true

end