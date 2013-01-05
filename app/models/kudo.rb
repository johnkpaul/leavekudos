class Kudo < ActiveRecord::Base

  attr_accessible :foursquare_user_id, :employee, :anecdote

  validates_presence_of :foursquare_user_id, :employee

  belongs_to :employee

  scope :recent, order(:created_at).limit(5)

end