class UsersController < ApplicationController
  before_filter :authenticate_user!

  def index
    @users = User.all
    authorize! :index, @users, :message => 'Not authorized as an administrator.'
  end

  def show
    @user = User.find(params[:id])
  end
  
  def update
    authorize! :update, @user, :message => 'Not authorized as an administrator.'
    @user = User.find(params[:id])
    if @user.update_attributes(params[:user], :as => :admin)
      redirect_to users_path, :notice => "User updated."
    else
      redirect_to users_path, :alert => "Unable to update user."
    end
  end
    
  def destroy
    authorize! :destroy, @user, :message => 'Not authorized as an administrator.'
    user = User.find(params[:id])
    unless user == current_user
      user.destroy
      redirect_to users_path, :notice => "User deleted."
    else
      redirect_to users_path, :notice => "Can't delete yourself."
    end
  end

  def get_faculty_admins 
    @faculty_admins = User.all.select{ |u| u.role_ids.include? 2 }
    respond_to do |format|
      format.html # index.html.erb
      format.json { render json: @faculty_admins }
    end
  end



end