class CreateThesisChanges < ActiveRecord::Migration
  def change
    create_table :thesis_changes do |t|
      t.string :action
      t.string :user_name
      t.string :value
      t.references :auditable, polymorphic: true

      t.timestamps
    end
  end
end
