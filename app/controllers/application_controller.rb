class ApplicationController < ActionController::Base

  protect_from_forgery

  before_filter :default_url_options
  after_filter :set_access_control_headers
  around_filter :select_shard 

  rescue_from CanCan::AccessDenied do |exception|
    redirect_to root_path, :alert => exception.message
  end

  def set_access_control_headers 
    headers['Access-Control-Allow-Origin'] = 'http://localhost:3000/' 
    headers['Access-Control-Request-Method'] = '*' 
  end


  def default_url_options(options={})
    params.merge!({year: Date.today.year.to_i}) unless params[:year]
  end 

  def select_shard(&block)
    Octopus.using("db_#{params[:year]}".to_sym, &block)
  end

end
