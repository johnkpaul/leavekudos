require 'twitter'
require 'ruby-bitly'

class TwitterWrapper
  extend ActionView::Helpers::TextHelper
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
    length_for_desc = 140 - 42 - handle.length - short_url.length
    description = truncate(kudo.employee.description, :length => length_for_desc)
    message = "@#{handle} someone left kudos for #{description}! #kudos info at #{short_url}"

    Rails.logger.info "unsent tweet message: #{message}"

    if Settings.tweeting.enabled
      begin
        Rails.logger.info "tweeting."
        tweet = Twitter.update(message)
        kudo.add_twitter_fields tweet
        kudo.save
      rescue Twitter::Error
        Rails.logger.error $!
      end
    end

  end 

end
