class ThesisChange < ActiveRecord::Base
  include OctopusConnector
  attr_accessible :action, :user_name, :value

  belongs_to :auditable, :polymorphic => true

end