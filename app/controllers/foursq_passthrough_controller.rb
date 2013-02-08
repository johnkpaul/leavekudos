require 'foursquare_wrapper'
require 'allow_cors'

class FoursqPassthroughController < ApplicationController

  #So we can use set_cors_headers()
  include AllowCors

  after_filter :set_cors_headers

  def checkins
    logger.debug "Fetching most recent checkins"
    render json: FoursquareWrapper.user_checkins(cookies[:fsq_token]).items
  end

end
