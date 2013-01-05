class VenueIdToString < ActiveRecord::Migration
  def up
    change_column :employees, :venue_id, :string
    change_column :kudos, :venue_id, :string
  end

  def down
    change_column :employees, :venue_id, :integer
    change_column :kudos, :venue_id, :integer
  end
end
