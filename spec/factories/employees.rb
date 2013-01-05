FactoryGirl.define do
  factory :employee do
    name { Faker::Name.name }
    venue_id { 1 }
  end
end