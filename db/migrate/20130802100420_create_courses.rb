class CreateCourses < ActiveRecord::Migration
  def change
    create_table :courses do |t|
      t.string :name
      t.date :year_of_start
      t.integer :faculty_id

      t.timestamps
    end
  end
end
