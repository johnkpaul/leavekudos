require 'foursq_wrapper'
require 'twitter_wrapper'

class KudosController < ApplicationController

  skip_before_filter :verify_authenticity_token

  def most_recent
    render json: Kudo.recent.as_json(:include => :employee)
  end

  def by_venue
    render json: { kudos: Kudo.where(venue_id: params[:venue_id]).recent }
  end

  def create
    puts "POSTing kudos"
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
      render json: { kudo: kudo.as_json(:include => :employee) }
    else
      render json: { errors: kudo.errors.full_messages}, status: 400
    end
  end

  private

  def tweet_to_venue(kudo)
    puts "KudosController: attempting to tweet to #{kudo.venue_id}"
    fsq_client = FoursqWrapper.create_client
    venue = fsq_client.venue(kudo.venue_id)
    if venue.contact.twitter 
      handle = venue.contact.twitter
      TwitterWrapper.tweet_to_venue handle, kudo
    else
      puts "#{kudo.venue_id} doesn't have a twitter handle."
    end
  end

end
