class FacultiesController < ApplicationController

  respond_to :json

  def index
    if params['filter'] === nil
      @faculties = Faculty.all
    else
      @faculties = Faculty.where(params['filter'])
    end
    respond_with @faculties
  end

  def show
    @faculty = Faculty.find(params[:id])
    respond_with @faculty 
  end

  def new
    @faculty = Faculty.new
    respond_with @faculty
  end

  def edit
    @faculty = Faculty.find(params[:id])
  end

  def create
    @faculty = Faculty.new(params[:faculty])
    if @faculty.save
      respond_with @faculty, status: :created, location: @faculty
    else
      respond_with @faculty.errors, status: :unprocessable_entity
    end
  end

  def update
    @faculty = Faculty.find(params[:id])
    if @faculty.update_attributes(params[:faculty])
      respond_with @faculty
    else
      respond_with @faculty.errors, status: :unprocessable_entity 
    end
  end

  def destroy
    @faculty = Faculty.find(params[:id])
    @faculty.destroy
    respond_with head :no_content 
  end
end
