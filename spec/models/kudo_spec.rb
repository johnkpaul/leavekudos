require 'spec_helper'

describe Kudo do

  it { should validate_presence_of(:foursquare_user_id) }

end