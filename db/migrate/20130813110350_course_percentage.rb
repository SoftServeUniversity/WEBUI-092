class CoursePercentage < ActiveRecord::Migration
   def change
     add_column :courses, :progress, :integer
   end
end
