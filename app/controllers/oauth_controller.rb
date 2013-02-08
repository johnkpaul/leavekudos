require 'oauth2'
require 'foursquare_wrapper'

class OauthController < ApplicationController
  
  def oauth2_client
   OAuth2::Client.new(Settings.foursquare_api.id, 
                                Settings.foursquare_api.secret, 
                                :site => 'http://foursquare.com/v2/',
                                :token_url => "/oauth2/access_token",
                                :authorize_url => "/oauth2/authenticate?response_type=code")
  end

  def register
    # Start the oauth flow
    logger.debug "Beginning oauth flow"
    redirect_to oauth2_client.auth_code.authorize_url(:redirect_uri => Settings.foursquare_api.redirect_url)
  end

  def callback
    logger.debug "Handling callback for #{params[:code]}"
    access_token = oauth2_client.auth_code.get_token(params[:code], 
                                                    :redirect_uri => Settings.foursquare_api.redirect_url)
    #TODO Need to persist the token so we can use it
    # for making requests on behalf of them (like replying to their checkins).
    cookies[:fsq_token] = access_token.token
    foursq_user = FoursquareWrapper.user(access_token.token,'self')
    User.find_or_create_by_foursquare_user_id!(foursq_user.user_id, foursquare_user_hash: foursq_user.to_hash)
    cookies[:fsq_userid] = foursq_user.id
    logger.info "Connected with user #{foursq_user.id}"
    redirect_to '/www/app'
  end
end
