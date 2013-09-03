class CreateTasks < ActiveRecord::Migration
  def change
    create_table :tasks do |t|
      t.string :name
      t.integer :work_id
      t.timestamps
    end
    add_index :tasks, :work_id
  end
end