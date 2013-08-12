class Faculty < ActiveRecord::Base
  attr_accessible :name, :user_id

  validates :name, length: { in: 1...45 }

  belongs_to :user
  has_many :departments
end
