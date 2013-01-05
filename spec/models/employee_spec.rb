require 'spec_helper'

describe Employee do

  it { should validate_presence_of(:venue_id) }
  it { should validate_presence_of(:name) }

end