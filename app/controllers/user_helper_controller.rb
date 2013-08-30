class UserHelperController < ApplicationController

  before_filter :authenticate_user!, :except => [:receive_current_user, :role_pending, :return_current_role, :populate_roles_select, :receive_user_abilities]

  include AbilitiesHelper

  def receive_current_user
    render json: user_signed_in? ? current_user : false
  end

  def role_pending
    render json: User.find(params[:id]).role_pending? 
  end

  def return_current_role
    render json: User.find(params[:id]).roles.first.name
  end

  def populate_roles_select
    render json: Role.find(:all, :conditions => ["name != ?", 'admin'])
  end

  def receive_user_abilities
    render json: receive_abilities_for(:work, :task) # returs merged hash. Definition may be found in AbilitiesHelper
  end

end