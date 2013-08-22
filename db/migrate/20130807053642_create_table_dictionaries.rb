class CreateTableDictionaries < ActiveRecord::Migration
  def change
    create_table :table_dictionaries do |t|
      t.string :name

      t.timestamps
    end
  end
end
