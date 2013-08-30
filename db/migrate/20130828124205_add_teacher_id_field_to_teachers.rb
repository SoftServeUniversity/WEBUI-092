class AddTeacherIdFieldToTeachers < ActiveRecord::Migration
  def change
    add_column :teachers, :teacher_id, :integer
    add_index :teachers, :teacher_id
  end
end
