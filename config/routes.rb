Leavekudos::Application.routes.draw do

  scope "/api" do
    match "kudos/mostrecent" => "kudos#most_recent", :via => :get
    match "kudos" => "kudos#create", :via => :post
    match "kudos/:kudo_id" => "kudos#show", :via => :get

    match "venue/:venue_id/employees" => "employees#show"
    match "venue/:venue_id/kudos" => "kudos#by_venue"

    match "checkins" => "foursq_passthrough#checkins"
    resources :kudos
  end

  match "/venues/:venue_id" => "venues#show", :as => :venues_detail
  match "/venues" => "venues#index"

  match "/kudos/:kudo_id" => "kudos#show", :as => :kudos_detail

  # oauth endpoints
  match "/connect" => "oauth#register"
  match "/callback" => "oauth#callback"

end
