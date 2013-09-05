class CreateProgressChanges < ActiveRecord::Migration
  def change
    create_table :progress_changes do |t|
      t.integer :progress
      t.integer :progressable_id
      t.string  :progressable_type

      t.timestamps
    end
  end
end
