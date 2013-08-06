class CreateFaculties < ActiveRecord::Migration
  def change
    create_table :faculties do |t|
      t.string :name
      t.integer :user_id

      t.timestamps
    end
    add_index :faculties, :user_id
  end
end
