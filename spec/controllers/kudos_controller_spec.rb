require 'spec_helper'
require 'foursquare2'

describe KudosController do

  let!(:kudo) { FactoryGirl.create(:kudo, employee: employee, venue_id: venue_id) }
  let(:employee) { FactoryGirl.create(:employee, name: 'Ben Burton') }
  let(:venue_id) { 1 }

  describe "GET most_recent" do
    subject { 
      get :most_recent 
    }

    it "should return most recent kudos" do
      subject
      response.body.should include kudo.anecdote
    end

  end

  describe "GET by_venue" do
    subject { get :by_venue, venue_id: venue_id }

    it "should return kudos for the venue" do
      subject
      response.body.should include kudo.anecdote
    end
  end

  describe "POST create" do
    subject { 
      request.cookies['fsq_token'] = 'dummy_access_token'

      dummy_fsq_client = double(Foursquare2::Client)
      dummy_fsq_client.stub(:user) { 
        OpenStruct.new  firstName: "FirstTest", lastName: "LastTest", photo: "http://example.com/avatar.jpg" 
      }
      dummy_fsq_client.stub(:venue) {
        OpenStruct.new  name: "Test Venue"
      }
      FoursqWrapper.stub(:create_authenticated_client) { dummy_fsq_client }
      post :create, kudo: kudo_parameters 
    }
    let(:kudo_parameters) {
      {
        foursquare_user_id: foursquare_user_id,
        employee_id: employee_id,
        venue_id: venue_id_param
      }
    }
    let(:employee_id) { employee.id }
    let(:foursquare_user_id) { 123 }
    let(:venue_id_param) { 1 }

    it "should create a new kudo" do
      expect { subject }.to change { Kudo.count }.by 1
    end

    context "missing employee" do
      let(:employee_id) { 404 }

      it "should return an error" do
        subject
        response.body.should include "Employee can't be blank"
      end
    end

    context "missing foursquare user" do
      let(:foursquare_user_id) { nil }
      it "should return an error" do
        subject
        response.body.should include "Foursquare user can't be blank"
      end
    end

    context "missing venue" do
      let(:venue_id_param) { nil }
      it "should return an error" do
        subject
        response.body.should include "Venue can't be blank"
      end
    end

    context "with a new employee" do
      let(:kudo_parameters) {
        {
          foursquare_user_id: foursquare_user_id,
          employee: employee_parameters,
          venue_id: venue_id_param
        }
      }
      let(:employee_parameters) {
        {
          name: "New Employee",
          description: "The guy who always wears a hat."
        }
      }

      it "should create a new employee" do
        expect { subject }.to change { Employee.count }.by 1
      end

      it "should create a new kudo" do
        expect { subject }.to change { Kudo.count }.by 1
      end

    end

  end

end
