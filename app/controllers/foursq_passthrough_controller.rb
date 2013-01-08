require 'foursq_wrapper'

class FoursqPassthroughController < ApplicationController

  def checkins
    logger.debug "Fetching most recent checkins"
    render json: FoursqWrapper.user_checkins(cookies[:fsq_token]).items
  end

end
