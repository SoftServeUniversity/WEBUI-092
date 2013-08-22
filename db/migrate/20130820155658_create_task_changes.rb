class CreateTaskChanges < ActiveRecord::Migration
  def change
    create_table :task_changes do |t|
      # t.belongs_to :task
      # t.belongs_to :user
      t.integer :task_id
      t.integer :user_id
      t.text :task_comment
      t.timestamps
    end

    create_table :task_processes do |t|
		t.integer :process
		t.integer :task_change_id
    	t.timestamps
    end
  end
end