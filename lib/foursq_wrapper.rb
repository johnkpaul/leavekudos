require 'foursquare2'

class FoursqWrapper

  def FoursqWrapper.venue(venue_id)
    client = create_client
    return client.venue(venue_id)
  end

  def FoursqWrapper.user(token, user_id)
    client = create_authenticated_client token
    return client.user(user_id)
  end

  def FoursqWrapper.add_checkin_post(token, opts)
    client = create_authenticated_client token
    client.add_checkin_post(opts[:checkin_id], {text: opts[:message], url: opts[:url]})
  end

  def FoursqWrapper.user_checkins(token)
    client = create_authenticated_client token
    client.user_checkins
  end

  private

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
