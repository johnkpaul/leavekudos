require 'foursquare2'

class FoursquareWrapper

  def FoursquareWrapper.venue(venue_id)
    client = create_client
    return client.venue(venue_id)
  end

  def FoursquareWrapper.user(token, user_id)
    client = create_authenticated_client token
    return client.user(user_id)
  end

  def FoursquareWrapper.add_checkin_post(token, opts)
    client = create_authenticated_client token
    client.add_checkin_post(opts[:checkin_id], {text: opts[:text], url: opts[:url]})
  end

  def FoursquareWrapper.user_checkins(token)
    client = create_authenticated_client token
    client.user_checkins
  end

  def FoursquareWrapper.add_checkin_reply(token, checkin_id, opts)
    client = create_authenticated_client token
    client.add_checkin_reply(checkin_id, opts)
  end

  private

  def FoursquareWrapper.create_client
    Rails.logger.debug "creating unauthenticated client"
    Foursquare2::Client.new(:client_id => Settings.foursquare_api.id, 
                            :client_secret => Settings.foursquare_api.secret)
  end

  def FoursquareWrapper.create_authenticated_client(oauth_token)
    Rails.logger.debug "creating authenticated client for token: #{oauth_token}"
    Foursquare2::Client.new(:oauth_token => oauth_token)
  end
end
