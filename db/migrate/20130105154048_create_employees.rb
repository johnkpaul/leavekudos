class CreateEmployees < ActiveRecord::Migration
  def up
    create_table :employees do |t|
      t.integer :venue_id
      t.string :name
      t.text :description
    end
  end

  def down
    drop_table :employees
  end
end
