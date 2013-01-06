require 'foursq_wrapper'

class Kudo < ActiveRecord::Base

  attr_accessible :foursquare_user_id, :employee, :employee_id, :venue_id, :anecdote, :created_at, :updated_at, 
    :venue_notified, :foursquare_username, :foursquare_avatar, :foursquare_venue_name
  
  validates_presence_of :foursquare_user_id, :employee, :venue_id

  belongs_to :employee

  accepts_nested_attributes_for :employee

  scope :recent, order('created_at desc').limit(5)

  def add_foursquare_fields(token)
    client = FoursqWrapper.create_authenticated_client(token)
    user = client.user('self')
    self.foursquare_username = user.firstName + user.lastName
    self.foursquare_avatar = user.photo
    self.foursquare_venue_name = client.venue(self.venue_id).name
  end

end
