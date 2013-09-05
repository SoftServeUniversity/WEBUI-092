class DepartmentsController < ApplicationController

  respond_to :json
  
  # GET /departments
  # GET /departments.json
  def index
    respond_with  Department.where(params['filter'])
  end


  # GET /departments/1
  # GET /departments/1.json
  def show
    respond_with  Department.find(params[:id])
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
    
    respond_to do |format|
      if @department.update_attributes(params[:department])
          format.json { head :no_content }
      else
        respond_with @department.errors, status: :unprocessable_entity 
      end
    end
  end

  # DELETE /departments/1
  # DELETE /departments/1.json
  def destroy
    @department = Department.find(params[:id])
    
    respond_to do |format| 
      @department.destroy
      format.json { head :no_content } 
    end
  end

end
