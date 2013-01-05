require 'spec_helper'

describe EmployeesController do

  let(:venue_id) { 1 }
  let!(:employee) { FactoryGirl.create(:employee, venue_id: venue_id) }

  describe "GET show" do
    subject { get :show, venue_id: venue_id }

    it "should return employee for venue" do
      subject
      response.body.should include employee.name
    end

  end

end