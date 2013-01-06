# Load the rails application
require File.expand_path('../application', __FILE__)

# Log to stdout
Rails.logger = Logger.new(STDOUT)

# Initialize the rails application
Leavekudos::Application.initialize!
