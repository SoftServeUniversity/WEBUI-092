class DepPercentage < ActiveRecord::Migration
  def change
    add_column :departments, :percentage, :integer
  end
end
