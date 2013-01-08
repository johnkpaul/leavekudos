require 'ruby-bitly'

class BitlyWrapper
  @@cache = {}
  def BitlyWrapper.shorten(link)

    if @@cache[link]
      Rails.logger.debug "Cache hit for #{link}"
      return @@cache[link]
    end

    shortened_url = Bitly.shorten(link, 
                                  Settings.bitly_api.user,
                                  Settings.bitly_api.key)
    Rails.logger.info "Shortened #{link} to #{shortened_url.url}"
    @@cache[link] = shortened_url
    return shortened_url
  end
end
