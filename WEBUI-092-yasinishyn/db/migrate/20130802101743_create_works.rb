class CreateWorks < ActiveRecord::Migration
  def change
    create_table :works do |t|
      t.string :name
      t.integer :progress
      t.integer :student_id

      t.timestamps
    end
    add_index :works, :student_id
  end
end
