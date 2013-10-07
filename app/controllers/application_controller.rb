class ApplicationController < ActionController::Base

  protect_from_forgery

  after_filter :set_access_control_headers
  #around_filter :select_shard 

  rescue_from CanCan::AccessDenied do |exception|
    redirect_to root_path, :alert => exception.message
  end

  def set_access_control_headers 
    headers['Access-Control-Allow-Origin'] = 'http://localhost:3000/' 
    headers['Access-Control-Request-Method'] = '*' 
  end

  def default_url_options(options={})
    { year: Date.today.year }
  end 

  def select_shard
    # Establish global connection
  end

end
