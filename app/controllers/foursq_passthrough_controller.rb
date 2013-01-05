require 'foursq_wrapper'

class FoursqPassthroughController < ApplicationController

  def checkins
    token = cookies[:fsq_token]
    authenticated_client = FoursqWrapper.create_authenticated_client(token)
    render json: {checkins: authenticated_client.user_checkins }
  end

end
