class CreateFacultyAdmins < ActiveRecord::Migration
  def change
    create_table :faculty_admins do |t|
      t.integer :user_id
      t.integer :faculty_id

      t.timestamps
    end
    add_index :faculty_admins, :user_id
    add_index :faculty_admins, :faculty_id
  end
end
