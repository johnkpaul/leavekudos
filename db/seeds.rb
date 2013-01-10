# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ :name => 'Chicago' }, { :name => 'Copenhagen' }])
#   Mayor.create(:name => 'Emanuel', :city => cities.first)


if Rails.env.development?
  ryan = Employee.find_or_create_by_name('Ryan Juang', venue_id: 123, description: "Wears shirts. Sometimes.")
  john = Employee.find_or_create_by_name('John Paul', venue_id: 123, description: "Indian guy with giant beard.")
  ben = Employee.find_or_create_by_name('Ben Burton', venue_id: 123, description: "White boy with Macbook Pro connected at hip.")
  Kudo.find_or_create_by_anecdote!("Great Service", foursquare_user_id: 41573486, foursquare_venue_name: "Some foursquare venue", venue_id: 123, foursquare_username: "John Doe", employee: ryan)
  Kudo.find_or_create_by_anecdote!("So helpful", foursquare_user_id: 41573486, foursquare_venue_name: "Some foursquare venue", venue_id: 123, foursquare_username: "John Doe", employee: john)
  Kudo.find_or_create_by_anecdote!("Amazing help", foursquare_user_id: 41573486, foursquare_venue_name: "Some foursquare venue", venue_id: 123, foursquare_username: "John Doe", employee: john)
  Kudo.find_or_create_by_anecdote!("Really patient", foursquare_user_id: 41573486, foursquare_venue_name: "Some foursquare venue", venue_id: 123, foursquare_username: "John Doe", employee: ben)
end
