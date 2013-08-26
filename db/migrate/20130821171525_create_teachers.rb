class CreateTeachers < ActiveRecord::Migration
  def change
    create_table :teachers do |t|
      t.integer :user_id
      t.integer :department_id
      t.string :degree
      t.string :title

      t.timestamps
    end
    add_index :teachers, :user_id
    add_index :teachers, :department_id
  end
end
