class Faculty < ActiveRecord::Base
  attr_accessible :name, :user_id

  belongs_to :user
  has_many :departments
end
