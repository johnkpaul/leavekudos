class EmployeesController < ApplicationController

  after_filter :set_access_control_headers

  def show
    render json: Employee.where(venue_id: params[:venue_id])
  end

  def set_access_control_headers 
      headers['Access-Control-Allow-Origin'] = Settings.static_app_base_url 
      headers['Access-Control-Allow-Credentials'] = 'true'
      headers['Access-Control-Request-Method'] = '*' 
  end

end
