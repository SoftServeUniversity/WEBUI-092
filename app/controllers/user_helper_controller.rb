class UserHelperController < ApplicationController
  before_filter :authenticate_user!, :except => [:receive_current_user]
  def receive_current_user
    if user_signed_in?
      render json: current_user
    else
      render json: false
    end
  end
end