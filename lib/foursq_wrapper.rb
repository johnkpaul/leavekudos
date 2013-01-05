require 'foursquare2'

class FoursqWrapper
  def FoursqWrapper.create_client
    Foursquare2::Client.new(:client_id => Settings.foursqapi.id, 
                            :client_secret => Settings.foursqapi.secret)
  end

  def FoursqWrapper.create_authenticated_client(oauth_token)
    Foursquare2::Client.new(:oauth_token => oauth_token)
  end
end
