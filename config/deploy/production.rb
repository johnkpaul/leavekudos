# It's all the same machine
server 'leavekudos.com', :app, :web, :primary => true

set :user, "leavekudos" # The server's user for deploys

set :deploy_to, "/opt/webapps/www.leavekudos.com"

role :web, "leavekudos.com" # Your HTTP server, Apache/etc
role :app, "leavekudos.com" # This may be the same as your `Web` server
role :db,  "leavekudos.com", :primary => true # This is where Rails migrations will run

