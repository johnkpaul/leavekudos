class CreateKudos < ActiveRecord::Migration
  def up
    create_table :kudos do |t|
      t.integer :foursquare_user_id
      t.integer :venue_id
      t.text :anecdote
      t.boolean :venue_notified
    end
  end

  def down
    drop_table :kudos
  end
end
