require 'foursquare_wrapper'

class FoursqPassthroughController < ApplicationController

  after_filter :set_access_control_headers

  def checkins
    logger.debug "Fetching most recent checkins"
    render json: FoursquareWrapper.user_checkins(cookies[:fsq_token]).items
  end

  def set_access_control_headers 
      headers['Access-Control-Allow-Origin'] = '*' 
      headers['Access-Control-Request-Method'] = '*' 
  end

end
