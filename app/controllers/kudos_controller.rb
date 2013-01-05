class KudosController < ApplicationController

  def most_recent
    render json: { kudos: Kudo.recent }
  end

  def by_venue
    render json: { kudos: Kudo.where(venue_id: params[:venue_id]).recent }
  end

end