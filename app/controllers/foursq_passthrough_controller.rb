require 'foursq_wrapper'

class FoursqPassthroughController < ApplicationController

  def checkins
    token = cookies[:fsq_token]
    authenticated_client = FoursqWrapper.create_authenticated_client(token)
    render json: authenticated_client.user_checkins.items
  end

end
