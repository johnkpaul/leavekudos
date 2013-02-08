class AddTokenToUser < ActiveRecord::Migration
  def up 
    add_column :users, :foursquare_token, :string
  end

  def down
    remove_column :users, :foursquare_token
  end

end
