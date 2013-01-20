class StatusController < ApplicationController

  def show
    revision = File.open("#{Rails.root}/REVISION").read.strip.to_s
    render :text => "#{ENV['RAILS_ENV']}  #{revision}"
  end

end
