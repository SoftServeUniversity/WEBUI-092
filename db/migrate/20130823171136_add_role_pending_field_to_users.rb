class AddRolePendingFieldToUsers < ActiveRecord::Migration
  def change
    add_column :users, :role_pending, :boolean, default: false
  end
end
