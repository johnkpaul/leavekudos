class AddFoursquareFieldsToKudos < ActiveRecord::Migration
  def up 
    add_column :kudos, :foursquare_username, :string
    add_column :kudos, :foursquare_avatar, :string
    add_column :kudos, :foursquare_venue_name, :string
  end

  def down
    remove_column :kudos, :foursquare_username
    remove_column :kudos, :foursquare_avatar
    remove_column :kudos, :foursquare_venue_name
  end
end
