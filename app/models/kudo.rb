class Kudo < ActiveRecord::Base

  attr_accessible :foursquare_user_id, :employee, :employee_id, :venue_id, :anecdote

  attr_accessor :foursquare_username, :foursquare_avatar
  
  validates_presence_of :foursquare_user_id, :employee, :venue_id

  belongs_to :employee

  accepts_nested_attributes_for :employee

  scope :recent, order(:created_at).limit(5)

end
