# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ :name => 'Chicago' }, { :name => 'Copenhagen' }])
#   Mayor.create(:name => 'Emanuel', :city => cities.first)


if Rails.env.development?
  Employee.find_or_create_by_name('Ryan Juang', venue_id: 123, description: "Ryan is a guy and he wears shirts. Sometimes.")
  Employee.find_or_create_by_name('John Paul', venue_id: 123, description: "John Paul is a really cool guy and doesn't afraid of anything")
  Employee.find_or_create_by_name('Ben Burton', venue_id: 123, description: "Ben is a programmer and he likes things.")
end