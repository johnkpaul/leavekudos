require 'spec_helper'

describe Kudo do

  it { should validate_presence_of(:foursquare_user_id) }
  it { should validate_presence_of(:employee) }
  it { should validate_presence_of(:venue_id) }

end