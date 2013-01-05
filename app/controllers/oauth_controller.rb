require 'oauth2'
require 'foursq_wrapper'

class OauthController < ApplicationController
  
  def oauth2_client
   OAuth2::Client.new(Settings.foursqapi.id, 
                                Settings.foursqapi.secret, 
                                :site => 'http://foursquare.com/v2/',
                                :token_url => "/oauth2/access_token",
                                :authorize_url => "/oauth2/authenticate?response_type=code")
  end

  def register
    # Start the oauth flow
    redirect_to oauth2_client.auth_code.authorize_url(:redirect_uri => 'http://localhost:3000/callback')
  end

  def callback
    access_token = oauth2_client.auth_code.get_token(params[:code], 
                                                    :redirect_uri => 'http://localhost:3000/callback')

    cookies[:fsq_token] = access_token.token
    client = FoursqWrapper.create_authenticated_client(access_token.token)
    me = client.user('self')
    puts me
    render json: {me: me}
  end
end
