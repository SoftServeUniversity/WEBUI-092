class UserHelperController < ApplicationController
  before_filter :authenticate_user!, :except => [:receive_current_user, :role_pending]

  def receive_current_user
    if user_signed_in?
      render json: current_user
    else
      render json: false
    end
  end

  def role_pending
    @user = User.find(params[:id])
    render json: @user.role_pending?
  end

  def return_current_role
  end

end