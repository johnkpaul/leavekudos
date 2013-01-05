class AddTimestampsToKudos < ActiveRecord::Migration
  def up
    change_table :kudos do |t|
      t.timestamps
    end
  end

  def down
    remove_column :kudos, :created_at
    remove_column :kudos, :updated_at
  end
end
