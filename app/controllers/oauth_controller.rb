require 'oauth2'
require 'foursq_wrapper'

class OauthController < ApplicationController
  
  def oauth2_client
   OAuth2::Client.new(Settings.foursq_api.id, 
                                Settings.foursq_api.secret, 
                                :site => 'http://foursquare.com/v2/',
                                :token_url => "/oauth2/access_token",
                                :authorize_url => "/oauth2/authenticate?response_type=code")
  end

  def register
    # Start the oauth flow
    puts "beginning oauth flow"
    redirect_to oauth2_client.auth_code.authorize_url(:redirect_uri => Settings.foursq_api.redirect_url)
  end

  def callback
    puts "handling callback for #{params[:code]}"
    access_token = oauth2_client.auth_code.get_token(params[:code], 
                                                    :redirect_uri => Settings.foursq_api.redirect_url)
    cookies[:fsq_token] = access_token.token
    client = FoursqWrapper.create_authenticated_client(access_token.token)
    foursq_user = client.user('self')
    cookies[:fsq_userid] = foursq_user.id
    redirect_to '/www'
  end
end
