require 'twitter'

class TwitterWrapper
  def TwitterWrapper.tweet_to_venue(handle, employee_desc)
    Twitter.configure do |config|
      config.consumer_key = Settings.twitter_api.key
      config.consumer_secret = Settings.twitter_api.secret
      config.oauth_token = Settings.twitter_api.token
      config.oauth_token_secret = Settings.twitter_api.token_secret
    end

    message = " someone left kudos for " + employee_desc + "! More at http://www.leavekudos.com"
    # TESTING
    handle = "johnkpaul"

    Twitter.update("@" + handle + " " + message)
  end 

end
