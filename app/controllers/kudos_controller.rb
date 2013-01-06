require 'foursq_wrapper'
require 'twitter_wrapper'

class KudosController < ApplicationController

  skip_before_filter :verify_authenticity_token

  def most_recent
    # Iterate through each recent item to give a rich user
    # object back
    render json: Kudo.recent.as_json(:include => :employee)
  end

  def by_venue
    render json: { kudos: Kudo.where(venue_id: params[:venue_id]).recent }
  end

  def create
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
      tweet_to_venue params[:kudo][:venue_id], employee.description
      render json: { kudo: kudo.as_json(:include => :employee) }
    else
      render json: { errors: kudo.errors.full_messages}, status: 400
    end
  end

  private

  def tweet_to_venue(venue_id, employee_desc)
    fsq_client = FoursqWrapper.create_client
    venue = fsq_client.venue(venue_id)
    if venue.contact.twitter 
      handle = venue.contact.twitter
      TwitterWrapper.tweet_to_venue handle,employee_desc
    end
  end

end
