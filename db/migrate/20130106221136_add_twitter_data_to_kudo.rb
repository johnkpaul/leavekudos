class AddTwitterDataToKudo < ActiveRecord::Migration
  def up
    add_column :kudos, :tweet_id, :string
    add_column :kudos, :tweet_text, :string
  end
  def down
    remove_column :kudos, :tweet_id
    remove_column :kudos, :tweet_text

  end
end
