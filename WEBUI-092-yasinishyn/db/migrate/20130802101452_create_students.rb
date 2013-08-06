class CreateStudents < ActiveRecord::Migration
  def change
    create_table :students do |t|
      t.integer :user_id
      t.integer :group_id

      t.timestamps
    end
    add_index :students, :user_id
    add_index :students, :group_id
  end
end
