server 'staging.leavekudos.com', :app, :web, :primary => true

set :deploy_to, "/opt/webapps/staging.leavekudos.com"

role :web, "staging.leavekudos.com"                          # Your HTTP server, Apache/etc
role :app, "staging.leavekudos.com"                          # This may be the same as your `Web` server
role :db,  "staging.leavekudos.com", :primary => true # This is where Rails migrations will run

