class User < ActiveRecord::Base
  # Include default devise modules. Others available are:
  # :token_authenticatable, :confirmable,
  # :lockable, :timeoutable and :omniauthable

  # Setup accessible (or protected) attributes for your model
  attr_accessible :foursquare_user_id, :foursquare_user_hash
  # attr_accessible :title, :body
  serialize :fourquare_user_hash, Hash
end
