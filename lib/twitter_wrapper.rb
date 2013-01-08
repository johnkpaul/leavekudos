require 'twitter'

class TwitterWrapper

  def TwitterWrapper.tweet(message)
    # TODO This needs to only happen once?
    Twitter.configure do |config|
      config.consumer_key = Settings.twitter_api.key
      config.consumer_secret = Settings.twitter_api.secret
      config.oauth_token = Settings.twitter_api.token
      config.oauth_token_secret = Settings.twitter_api.token_secret
    end

    Rails.logger.info "Tweet message: #{message}"

    if Settings.tweeting.enabled
      begin
        Rails.logger.info "Sending tweet."
        tweet = Twitter.update(message)
        kudo.add_twitter_fields tweet
        kudo.save
      rescue Twitter::Error
        Rails.logger.error "Tweet unsent:"
        Rails.logger.error $!
      end
    end

  end 

end
