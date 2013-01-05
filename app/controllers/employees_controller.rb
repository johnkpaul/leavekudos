class EmployeesController < ApplicationController

  def show
    render json: { employees: Employee.where(venue_id: params[:venue_id]) }
  end


end