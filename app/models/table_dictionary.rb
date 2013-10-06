class TableDictionary < ActiveRecord::Base
  include OctopusConnector
  attr_accessible :name
end
