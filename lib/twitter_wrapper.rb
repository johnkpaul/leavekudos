require 'twitter'
require 'bitly_wrapper'

class TwitterWrapper
  # So we can use truncate()
  extend ActionView::Helpers::TextHelper

  def TwitterWrapper.tweet_to_venue(handle, kudo)
    # TODO This needs to only happen once?
    Twitter.configure do |config|
      config.consumer_key = Settings.twitter_api.key
      config.consumer_secret = Settings.twitter_api.secret
      config.oauth_token = Settings.twitter_api.token
      config.oauth_token_secret = Settings.twitter_api.token_secret
    end

    bitly = BitlyWrapper.shorten("http://www.leavekudos.com/venues/#{kudo.venue_id}")
    length_for_desc = 140 - 42 - handle.length - bitly.url.length
    description = truncate(kudo.employee.description, :length => length_for_desc)
    message = "@#{handle} someone left kudos for #{description}! #kudos info at #{bitly.url}"

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
