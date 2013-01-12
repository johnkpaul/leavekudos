require "bundler/capistrano" 

# Taken from https://help.github.com/articles/deploying-with-capistrano
default_run_options[:pty] = true  # Must be set for the password prompt
                                  # from git to work

set :application, "test.leavekudos.com"
set :repository,  "git@github.com:johnkpaul/leavekudos.git"
set :user, "papajuans"  # The server's user for deploys
set :scm, :git
set :use_sudo, false
set :branch, "master"

set :ssh_options, {:forward_agent => true}

# From 
# http://docs.webfaction.com/software/rails.html#deploying-a-ruby-on-rails-application-with-capistrano
set :deploy_to, "/home/papajuans/webapps/leavekudos_test"

role :web, "web95.webfaction.com"                          # Your HTTP server, Apache/etc
role :app, "web95.webfaction.com"                          # This may be the same as your `Web` server
role :db,  "web95.webfaction.com", :primary => true # This is where Rails migrations will run

namespace :deploy do
  desc "Restart nginx"
  task :restart do
    run "#{deploy_to}/bin/restart"
  end
end

# Since WebFaction is shared hosting and this guy doesn't run in interactive mode,
# we setup some ENV variables so that commands like rake and bundle are available
set :default_environment, {
  'PATH' => "#{deploy_to}/bin:$PATH",
  'GEM_HOME' => "#{deploy_to}/gems",
  'RUBYLIB' => "#{deploy_to}/lib",
}

# Delete old shit
set :keep_releases, 3
after "deploy:restart", "deploy:cleanup" 

# if you want to clean up old releases on each deploy uncomment this:
# after "deploy:restart", "deploy:cleanup"

# if you're still using the script/reaper helper you will need
# these http://github.com/rails/irs_process_scripts

# If you are using Passenger mod_rails uncomment this:
# namespace :deploy do
#   task :start do ; end
#   task :stop do ; end
#   task :restart, :roles => :app, :except => { :no_release => true } do
#     run "#{try_sudo} touch #{File.join(current_path,'tmp','restart.txt')}"
#   end
# end
