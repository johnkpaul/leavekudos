Leavekudos::Application.routes.draw do

  scope "/api" do
    match "kudos/mostrecent" => "kudos#most_recent", :via => :get
    match "kudos" => "kudos#create", :via => :post
    match "kudos/:kudo_id" => "kudos#show", :via => :get

    match "venue/:venue_id/employees" => "employees#show", :via => :get
    match "venue/:venue_id/kudos" => "kudos#by_venue", :via => :get
    match "venue/:venue_id" => "venues#show", :as => :venues_detail

    match "push/checkin" => "push#checkin", :via => :post

    match "reply" => "push#reply", :via => :get

    match "checkins" => "foursq_passthrough#checkins", :via => :get
    resources :kudos
  end

  match "/venues" => "venues#index"

  match "/kudos/:kudo_id" => "kudos#show", :as => :kudos_detail
  match "/status" => "status#show"

  # oauth endpoints
  match "/connect" => "oauth#register"
  match "/callback" => "oauth#callback"

end
