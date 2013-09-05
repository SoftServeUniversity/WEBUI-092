class CreateWorks < ActiveRecord::Migration
  def change
    create_table :works do |t|
      t.string :name
      t.integer :student_id
      t.integer :teacher_id

      t.timestamps
    end
    add_index :works, :student_id
    add_index :works, :teacher_id
  end
end
