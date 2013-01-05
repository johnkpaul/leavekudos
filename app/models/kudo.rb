class Kudo < ActiveRecord::Base

  attr_accessible :foursquare_user_id, :employee, :employee_id, :venue_id, :anecdote

  validates_presence_of :foursquare_user_id, :employee, :venue_id

  belongs_to :employee

  scope :recent, order(:created_at).limit(5)

end