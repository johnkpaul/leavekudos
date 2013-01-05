require 'foursq_wrapper'

class VenuesController < ApplicationController

  def show
    client = FoursqWrapper.create_client
    @venue = client.venue(params[:venue_id])
    @employees =  Employee.where(venue_id: params[:venue_id])
  end

end
