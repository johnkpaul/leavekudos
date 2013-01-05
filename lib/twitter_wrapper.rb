require 'twitter'

class TwitterWrapper
  def TwitterWrapper.tweet_to_venue(venue_twitter_handle)
    Twitter.configure do |config|
      config.consumer_key = Settings.twitter_api.key
      config.consumer_secret = Settings.twitter_api.secret
      config.oauth_token = Settings.twitter_api.token
      config.oauth_token_secret = Settings.twitter_api.token_secret
    end

    Twitter.update("debug tweet " + Time.now.to_f.to_s)
  end 

end
