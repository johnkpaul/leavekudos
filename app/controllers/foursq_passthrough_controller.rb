class FoursqPassthroughController < ApplicationController

  def checkins
    text_to_render = <<-SAMPLE
    {checkins: {
count: 45
items: [
{
id: "50e834fae4b0065448487252"
createdAt: 1357395194
type: "checkin"
timeZoneOffset: -300
venue: {
id: "4ef0e7cf7beb5932d5bdeb4e"
name: "Foursquare HQ"
contact: {
twitter: "foursquare"
}
location: {
address: "568 Broadway (10th Floor)"
crossStreet: "at Prince"
lat: 40.724169079279605
lng: -73.99721145629883
postalCode: "10012"
city: "New York"
state: "NY"
country: "United States"
cc: "US"
}
canonicalUrl: "https://foursquare.com/v/foursquare-hq/4ef0e7cf7beb5932d5bdeb4e"
categories: [
{
id: "4bf58dd8d48988d125941735"
name: "Tech Startup"
pluralName: "Tech Startups"
shortName: "Tech Startup"
icon: {
prefix: "https://foursquare.com/img/categories_v2/shops/technology_"
suffix: ".png"
}
primary: true
}
]
verified: true
stats: {
checkinsCount: 25867
usersCount: 5376
tipCount: 147
}
url: "https://foursquare.com"
likes: {
count: 494
groups: [
{
type: "others"
count: 494
items: [ ]
}
]
summary: "494 likes"
}
like: false
beenHere: {
count: 1
marked: false
}
specials: {
count: 0
}
}
event: {
id: "50e83339011c06dc418fabce"
name: "Foursquare Hackathon 2013"
foreignIds: {
count: 0
items: [ ]
}
categories: [ ]
}
likes: {
count: 0
groups: [ ]
}
like: false
photos: {
count: 0
items: [ ]
}
posts: {
count: 0
textCount: 0
}
comments: {
count: 0
items: [ ]
}
source: {
name: "foursquare for iPhone"
url: "https://foursquare.com/download/#/iphone"
}
}
{
id: "50e7247fe4b0d84822b9bc3a"
createdAt: 1357325439
type: "checkin"
timeZoneOffset: -300
venue: {
id: "423f6000f964a5205f201fe3"
name: "Snack Taverna"
contact: {
phone: "2129293499"
formattedPhone: "(212) 929-3499"
}
location: {
address: "63 Bedford St"
lat: 40.730951
lng: -74.004561
postalCode: "10014"
city: "New York"
state: "NY"
country: "United States"
cc: "US"
}
canonicalUrl: "https://foursquare.com/v/snack-taverna/423f6000f964a5205f201fe3"
categories: [
{
id: "4bf58dd8d48988d10e941735"
name: "Greek Restaurant"
pluralName: "Greek Restaurants"
shortName: "Greek"
icon: {
prefix: "https://foursquare.com/img/categories_v2/food/greek_"
suffix: ".png"
}
primary: true
}
]
verified: false
stats: {
checkinsCount: 2010
usersCount: 1514
tipCount: 44
}
url: "http://www.snackny.com"
likes: {
count: 6
groups: [
{
type: "others"
count: 6
items: [
{
id: "9300"
firstName: "Corinna"
lastName: "P."
gender: "female"
photo: {
prefix: "https://irs0.4sqi.net/img/user/"
suffix: "/9300_1238615015.jpg"
}
}
{
id: "20994"
firstName: "Susan"
lastName: "L."
gender: "female"
photo: {
prefix: "https://irs2.4sqi.net/img/user/"
suffix: "/TOSC43NPJHNOCPIX.jpg"
}
}
{
id: "1184738"
firstName: "Colin"
lastName: "M."
gender: "male"
photo: {
prefix: "https://irs1.4sqi.net/img/user/"
suffix: "/OYHLBKW5BANYRUGE.jpg"
}
}
{
id: "13594574"
firstName: "C-rizzle"
gender: "female"
photo: {
prefix: "https://irs0.4sqi.net/img/user/"
suffix: "/FQYTRSW0I0U254C5.jpg"
}
}
]
}
]
summary: "Corinna P, Susan L, Colin M & 3 others"
}
like: false
reservations: {
url: "http://www.opentable.com/single.aspx?rid=50578&ref=1040"
}
menu: {
type: "foodAndBeverage"
url: "https://foursquare.com/v/snack-taverna/423f6000f964a5205f201fe3/menu"
mobileUrl: "https://foursquare.com/v/423f6000f964a5205f201fe3/device_menu"
}
beenHere: {
count: 1
marked: false
}
specials: {
count: 0
}
}
likes: {
count: 1
groups: [
{
type: "friends"
count: 1
items: [
{
id: "618282"
firstName: "Kathleen"
lastName: "Yanolatos"
gender: "female"
relationship: "friend"
photo: {
prefix: "https://irs3.4sqi.net/img/user/"
suffix: "/V02ZAYSNT5Z3UIBO.jpg"
}
}
]
}
]
summary: "Kathleen Yanolatos"
}
like: false
photos: {
count: 0
items: [ ]
}
posts: {
count: 0
textCount: 0
}
comments: {
count: 0
items: [ ]
}
source: {
name: "foursquare for iPhone"
url: "https://foursquare.com/download/#/iphone"
}]
}
SAMPLE
  render :json => text_to_render
  end

end
