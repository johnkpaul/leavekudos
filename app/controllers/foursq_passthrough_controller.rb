require 'foursq_wrapper'

class FoursqPassthroughController < ApplicationController

  def checkins
    token = cookies[:fsq_token]
    authenticated_client = FoursqWrapper.create_authenticated_client(token)
    cookies[:fsq_user_id] = authenticated_client.user('self').id
    render json: authenticated_client.user_checkins.items
  end

end
