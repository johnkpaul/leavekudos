require "bundler/capistrano" 

# Configuration for the multistage
# plugin. This allows us to do 'cap production $TASKNAME'
# or 'cap staging $TASKNAME'
# :default_stage is staging so 'cap $TASKNAME' defaults
# to staging
set :stages, %w(production staging)
set :default_stage, "staging"
require 'capistrano/ext/multistage'

# Taken from https://help.github.com/articles/deploying-with-capistrano
default_run_options[:pty] = true  # Must be set for the password prompt
                                  # from git to work

set :application, "leavekudos.com"
set :repository,  "git@github.com:johnkpaul/leavekudos.git"
#set :user, "papajuans"  # The server's user for deploys
set :scm, :git
set :use_sudo, false
set :branch, "master"

set :ssh_options, {:forward_agent => true}

namespace :deploy do
  desc "Touching restart.txt to force application reload"
  task :restart do
    run "touch #{File.join(current_path,'tmp','restart.txt')}"
  end
end

# Delete old shit
set :keep_releases, 3
after "deploy:restart", "deploy:cleanup" 

# Dumb task to check connectivity
task :uname do
  run "uname -a"
end

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
