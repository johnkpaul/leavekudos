class KudosController < ApplicationController

  def index
    render json: { kudos: 'you have them' }
  end

  def most_recent
    render json: { kudos: Kudo.recent }
  end

end