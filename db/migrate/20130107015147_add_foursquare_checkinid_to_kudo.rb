class AddFoursquareCheckinidToKudo < ActiveRecord::Migration
  def up 
    add_column :kudos, :foursquare_checkin_id, :string
  end
  def down
    remove_column :kudos, :foursquare_checkin_id
  end
end
