class DepPercentage < ActiveRecord::Migration
  def change
    add_column :departments, :progress, :integer
  end
end
