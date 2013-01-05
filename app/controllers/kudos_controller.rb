class KudosController < ApplicationController

  def index
    render json: { kudos: 'you have them' }
  end

end