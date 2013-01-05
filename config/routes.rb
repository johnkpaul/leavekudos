Leavekudos::Application.routes.draw do

  scope "/api" do
    match "kudos/mostrecent" => "kudos#most_recent"
    match "kudos" => "kudos#create"

    match "venue/:venue_id/employees" => "employees#show"
    match "venue/:venue_id/kudos" => "kudos#by_venue"

    match "checkins" => "foursq_passthrough#checkins"
    resources :kudos
  end

  match "/connect" => "oauth#register"
  match "/callback" => "oauth#callback"

end
