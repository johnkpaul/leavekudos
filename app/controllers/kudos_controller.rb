class KudosController < ApplicationController

  skip_before_filter :verify_authenticity_token

  def most_recent
    render json: { kudos: Kudo.recent.as_json(:include => :employee) }
  end

  def by_venue
    render json: { kudos: Kudo.where(venue_id: params[:venue_id]).recent }
  end

  def create
    kudo = Kudo.create(params[:kudo])
    if kudo.save
      render json: { kudo: kudo.as_json(:include => :employee) }
    else
      render json: { errors: kudo.errors.full_messages}, status: 400
    end
  end

end