Leavekudos::Application.routes.draw do

  match "kudos/mostrecent" => "kudos#most_recent"

  resources :kudos

end
