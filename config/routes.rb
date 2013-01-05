Leavekudos::Application.routes.draw do

  match "kudos/mostrecent" => "kudos#most_recent"

  match "venue/:venue_id/employees" => "employees#show"

  match "/connect" => "oauth#register"

  match "/callback" => "oauth#callback"

  match "/checkins" => "foursq_passthrough#checkins"

  resources :kudos

end
