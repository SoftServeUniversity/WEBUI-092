class CreateGroups < ActiveRecord::Migration
  def change
    create_table :groups do |t|
      t.string :name
      t.integer :course_id
      t.integer :department_id
      t.integer :teacher_id

      t.timestamps
    end
    add_index :groups, :course_id
    add_index :groups, :department_id
    add_index :groups, :teacher_id
  end
end
