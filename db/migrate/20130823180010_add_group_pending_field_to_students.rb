class AddGroupPendingFieldToStudents < ActiveRecord::Migration
  def change
    add_column :students, :group_pending, :boolean, default: true
  end
end
