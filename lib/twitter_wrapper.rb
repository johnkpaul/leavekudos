require 'twitter'

class TwitterWrapper
  def TwitterWrapper.tweet_to_venue(handle, kudo)
    # TODO This needs to only happen once?
    Twitter.configure do |config|
      config.consumer_key = Settings.twitter_api.key
      config.consumer_secret = Settings.twitter_api.secret
      config.oauth_token = Settings.twitter_api.token
      config.oauth_token_secret = Settings.twitter_api.token_secret
    end

    #TESTING
    message = "@johnkpaul someone left kudos for #{kudo.employee.description}! More at http://www.leavekudos.com"

    Rails.logger.info "unsent tweet message: #{message}"

    if Settings.tweeting.enabled
      Rails.logger.info "tweeting."
      tweet = Twitter.update(message)
      kudo.add_twitter_fields tweet
      kudo.save
    end

  end 

end
