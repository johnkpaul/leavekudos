Leavekudos::Application.routes.draw do

  match "kudos/mostrecent" => "kudos#most_recent"

  match "venue/:venue_id/employees" => "employees#show"

  resources :kudos

end
