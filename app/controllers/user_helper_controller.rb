class UserHelperController < ApplicationController
  before_filter :authenticate_user!, :except => [:receive_current_user, :role_pending, :return_current_role]

  def receive_current_user
    render json: user_signed_in? ? current_user : false
  end

  def role_pending
    render json: User.find(params[:id]).role_pending? 
  end

  def return_current_role
    render json: User.find(params[:id]).roles.first.name
  end

end