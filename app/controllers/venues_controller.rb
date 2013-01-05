require 'foursq_wrapper'

class VenuesController < ApplicationController

  def show
    client = FoursqWrapper.create_client
    @venue = client.venue(params[:venue_id])
    @employees =  Employee.where(venue_id: params[:venue_id])
  end

  def index
    client = FoursqWrapper.create_client
    venue_ids = Kudo.pluck(:venue_id).uniq
    @venues = Array.new
    venue_ids.each do |v_id| 
      v = client.venue(v_id)
      @venues.push v
    end
  end

end
