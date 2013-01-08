require 'ruby-bitly'

class BitlyWrapper
  # TODO make this limited in size
  @@cache = {}
  def BitlyWrapper.shorten(link)

    unless @@cache[link].nil?
      Rails.logger.debug "Cache hit for #{link}"
      return @@cache[link]
    end

    shortened_url = {}
    
    if Settings.url_shortening.enabled
      shortened_url = Bitly.shorten(link, 
                                    Settings.bitly_api.user,
                                    Settings.bitly_api.key)
    else
      shortened_url = OpenStruct.new url: link
    end

    Rails.logger.info "Shortened #{link} to #{shortened_url.url}"
    @@cache[link] = shortened_url
    return shortened_url
  end
end
