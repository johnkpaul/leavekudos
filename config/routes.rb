Leavekudos::Application.routes.draw do

  match "kudos/mostrecent" => "kudos#most_recent"

  match "venue/:venue_id/employees" => "employees#show"
  match "venue/:venue_id/kudos" => "kudos#by_venue"

end
