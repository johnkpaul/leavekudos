require 'twitter'
require 'ruby-bitly'

class TwitterWrapper
  def TwitterWrapper.tweet_to_venue(handle, kudo)
    # TODO This needs to only happen once?
    Twitter.configure do |config|
      config.consumer_key = Settings.twitter_api.key
      config.consumer_secret = Settings.twitter_api.secret
      config.oauth_token = Settings.twitter_api.token
      config.oauth_token_secret = Settings.twitter_api.token_secret
    end

    bitly = Bitly.shorten("http://www.leavekudos.com/venues/#{kudo.venue_id}", "johnkpaul", "R_f5b64ad86604a50d7d1c4d1cc96453af")
    short_url = bitly.url
    Rails.logger.info "short url is: #{short_url}"
    handle = "johnkpaul"
    message = "@#{handle} someone left kudos for #{kudo.employee.description}! #kudos info at #{short_url}"

    Rails.logger.info "unsent tweet message: #{message}"

    if Settings.tweeting.enabled
      Rails.logger.info "tweeting."
      tweet = Twitter.update(message)
      kudo.add_twitter_fields tweet
      kudo.save
    end

  end 

end
