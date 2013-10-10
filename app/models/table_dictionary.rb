class TableDictionary < ActiveRecord::Base
  include DbConnector
  
  attr_accessible :name
end
