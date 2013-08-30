class CoursePercentage < ActiveRecord::Migration
   def change
     add_column :courses, :percentage, :integer
   end
end
