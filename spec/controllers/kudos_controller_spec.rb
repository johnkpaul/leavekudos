require 'spec_helper'

describe KudosController do

  let!(:kudo) { FactoryGirl.create(:kudo, employee: employee) }
  let(:employee) { FactoryGirl.create(:employee, name: 'Ben Burton') }

  describe "GET most_recent" do

    subject { get :most_recent }

    it "should return most recent kudos" do
      subject
      response.body.should include kudo.anecdote
    end

  end

end