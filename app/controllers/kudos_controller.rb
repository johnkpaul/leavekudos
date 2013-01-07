require 'foursq_wrapper'
require 'twitter_wrapper'
require 'ruby-bitly'

class KudosController < ApplicationController
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
    logger.debug "attempting to tweet to #{kudo.venue_id}"
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
    logger.debug "attempting to post to foursqare checkin"
    fsq_client = FoursqWrapper.create_authenticated_client cookies[:fsq_token]

    bitly = Bitly.shorten("http://www.leavekudos.com/venues/#{kudo.venue_id}", "johnkpaul", "R_f5b64ad86604a50d7d1c4d1cc96453af")
    short_url = bitly.url
    Rails.logger.info "short url is: #{short_url}"
    length_for_desc = 200 - 42 - short_url.length
    description = truncate(kudo.employee.description, :length => length_for_desc)
    message = "I left kudos for #{description}!"
    fsq_client.add_checkin_post(kudo.foursquare_checkin_id, {text: message, url: short_url })
  end

end
