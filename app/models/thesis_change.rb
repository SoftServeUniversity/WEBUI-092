class ThesisChange < ActiveRecord::Base
  
  attr_accessible :action, :user_name, :value

  belongs_to :auditable, :polymorphic => true

end