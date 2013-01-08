require 'foursquare_wrapper'

class FoursqPassthroughController < ApplicationController

  def checkins
    logger.debug "Fetching most recent checkins"
    render json: FoursquareWrapper.user_checkins(cookies[:fsq_token]).items
  end

end
