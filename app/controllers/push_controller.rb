require 'foursquare_wrapper'

# This controller is responsible for receiving POSTs
# from the foursquare user push API:
# https://developer.foursquare.com/overview/realtime
class PushController < ApplicationController

  # This endpoint is POST'ed to by foursquare when
  # a connected user checkins
  # This should initiate the nag timer.
  def checkin
    logger.info "Received POST from foursquare push API"
    logger.info  params
    render :nothing => true
  end

  def reply
    logger.info 
    logger.info "Attempting to push a reply to a user"
    FoursquareWrapper.add_checkin_reply(cookies[:fsq_token], params[:checkin_id], {text: "Have great service? Leave Kudos!", url: "http://leavekudos.com"})
    render :nothing => true
  end

end
