class Employee < ActiveRecord::Base

  attr_accessible :name, :venue_id, :description

  validates_presence_of :name, :venue_id

  has_many :kudos

end