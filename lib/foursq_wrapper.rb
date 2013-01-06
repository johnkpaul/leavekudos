require 'foursquare2'

class FoursqWrapper
  def FoursqWrapper.create_client
    Rails.logger.debug "creating unauthenticated client"
    Foursquare2::Client.new(:client_id => Settings.foursq_api.id, 
                            :client_secret => Settings.foursq_api.secret)
  end

  def FoursqWrapper.create_authenticated_client(oauth_token)
    Rails.logger.debug "creating authenticated client for token: #{oauth_token}"
    Foursquare2::Client.new(:oauth_token => oauth_token)
  end
end
