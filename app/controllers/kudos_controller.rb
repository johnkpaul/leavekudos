require 'foursq_wrapper'
require 'twitter_wrapper'
require 'bitly_wrapper'

class KudosController < ApplicationController
  #So we can use truncate()
  include ActionView::Helpers::TextHelper

  skip_before_filter :verify_authenticity_token

  def most_recent
    render json: Kudo.recent.as_json(:include => :employee)
  end

  def by_venue
    render json: { kudos: Kudo.where(venue_id: params[:venue_id]).recent }
  end

  def create
    logger.info "creating kudos"
    employee = ""
    if params[:kudo][:employee]
      params[:kudo][:employee][:venue_id] = params[:kudo][:venue_id]
      employee = Employee.create(params[:kudo][:employee])
      params[:kudo][:employee_id] = employee.id
      params[:kudo].delete :employee
    end

    kudo = Kudo.new(params[:kudo])
    kudo.add_foursquare_fields cookies[:fsq_token]
    if kudo.save
      tweet_to_venue kudo
      post_to_checkin kudo
      render json: { kudo: kudo.as_json(:include => :employee) }
    else
      render json: { errors: kudo.errors.full_messages}, status: 400
    end
  end

  private

  def tweet_to_venue(kudo)
    logger.debug "Attempting to tweet to #{kudo.venue_id}"
    fsq_client = FoursqWrapper.create_client
    venue = fsq_client.venue(kudo.venue_id)
    if venue.contact.twitter 
      handle = venue.contact.twitter
      TwitterWrapper.tweet_to_venue handle, kudo
    else
      logger.info "Venue #{kudo.venue_id} doesn't have a twitter handle."
    end
  end

  def post_to_checkin(kudo)
    logger.debug "Attempting to post to foursqare checkin"
    #TODO probably not good
    bitly = BitlyWrapper.shorten("#{request.protocol}#{request.host_with_port}#/venues/#{kudo.venue_id}")

    length_for_desc = 200 - 42 - bitly.url.length
    description = truncate(kudo.employee.description, :length => length_for_desc)
    message = "I left kudos for #{description}!"

    fsq_client = FoursqWrapper.create_authenticated_client cookies[:fsq_token]
    fsq_client.add_checkin_post(kudo.foursquare_checkin_id, {text: message, url: bitly.url})
  end

end
