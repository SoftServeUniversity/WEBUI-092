class CreateTaskChanges < ActiveRecord::Migration
  def change
    create_table :task_changes do |t|
      # t.belongs_to :task
      # t.belongs_to :user
      t.integer :task_id
      t.integer :user_id
      t.integer :task_progress_id
      t.text :task_comment
      t.timestamps
    end

    create_table :task_progresses do |t|
  		t.integer :progress
      t.integer :task_id
    	t.timestamps
    end
   add_index :task_changes, :task_id
   add_index :task_changes, :task_progress_id
   add_index :task_progresses, :task_id
  end
end