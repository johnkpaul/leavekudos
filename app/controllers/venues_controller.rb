require 'foursquare_wrapper'

class VenuesController < ApplicationController

  def show
    @venue = FoursquareWrapper.venue(params[:venue_id])
    @employees =  Employee.includes(:kudos).find_all_by_venue_id(params[:venue_id])
    render :json => {
      :venue => @venue, 
      :employees => @employees.as_json(:include => :kudos)
    }
  end

  def index
    venue_ids = Kudo.pluck(:venue_id).uniq
    @venues = Array.new
    venue_ids.each do |v_id| 
      v = FoursquareWrapper.venue(v_id)
      @venues.push v
    end
  end

end
