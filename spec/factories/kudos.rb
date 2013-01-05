FactoryGirl.define do
  factory :kudo do
    foursquare_user_id { 1 }
    employee
    anecdote { Faker::Lorem.sentence(3) }
    venue_id { 1 }
  end
end