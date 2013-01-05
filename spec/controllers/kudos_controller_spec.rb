require 'spec_helper'

describe KudosController do

  let!(:kudo) { FactoryGirl.create(:kudo, employee: employee, venue_id: venue_id) }
  let(:employee) { FactoryGirl.create(:employee, name: 'Ben Burton') }
  let(:venue_id) { 1 }

  describe "GET most_recent" do
    subject { get :most_recent }

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

end