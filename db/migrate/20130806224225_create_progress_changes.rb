class CreateProgressChanges < ActiveRecord::Migration
  def change
    create_table :progress_changes do |t|
      t.integer :progress
      t.integer :entity_id
      t.integer :table_id

      t.timestamps
    end
  end
end
