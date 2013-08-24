class DepartmentsController < ApplicationController

  respond_to :json
  # GET /departments
  # GET /departments.json
  def index
    @departments = Department.search(params[:faculty_id])
    respond_to do |format|
      format.html # index.html.erb

      format.json { render json: @departments }
    end

  end

  # GET /departments/1
  # GET /departments/1.json
  def show
    respond_with @department = Department.find(params[:id])
  end


  # POST /departments
  # POST /departments.json
  def create
    @department = Department.new(params[:department])

    if @department.save
      respond_with @department, status: :created, location: @department
    else
      respond_with @department.errors, status: :unprocessable_entity 
    end
  end

  # PUT /departments/1
  # PUT /departments/1.json
  def update
    @department = Department.find(params[:id])

    if @department.update_attributes(params[:department])
      respond_with head :no_content 
    else
      respond_with @department.errors, status: :unprocessable_entity 
    end
  end

  # DELETE /departments/1
  # DELETE /departments/1.json
  def destroy
    @department = Department.find(params[:id])
    @department.destroy

    respond_with head :no_content 
  end
end
