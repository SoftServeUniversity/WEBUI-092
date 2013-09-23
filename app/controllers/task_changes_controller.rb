class TaskChangesController < ApplicationController
  # GET /task_changes
  # GET /task_changes.json
  def index
    @task_changes = TaskChange.all

    respond_to do |format|
      format.html # index.html.erb
      format.json { render json: @task_changes }
    end
  end

  # GET /task_changes/1
  # GET /task_changes/1.json
  def show
    if params[:page]
      set_limit = 10
      set_offset = params[:page].to_i * set_limit
      @task_changes = TaskChange.where(task_id: params[:id]).offset(set_offset).limit(set_limit).order("created_at DESC")
    else
      @task_changes = TaskChange.where(task_id: params[:id]).order("created_at DESC")
    end
    respond_to do |format|
      format.html # show.html.erb
      format.json { render json: @task_changes.to_json(:include => {
        :user => {:only => [:name, :last_name, :middle_name]}
      })}

    end
  end

  # GET /task_changes/new
  # GET /task_changes/new.json
  def new
    @task_changes = TaskChange.new

    respond_to do |format|
      format.html # new.html.erb
      format.json { render json: @task_changes }
    end
  end

  # GET /task_changes/1/edit
  def edit
    @task_changes = TaskChange.find(params[:id])
  end

  # POST /task_changes
  # POST /task_changes.json
  def create
    @task_changes = TaskChange.new(params[:task_change])

    respond_to do |format|
      if @task_changes.save
        format.html { redirect_to @task_changes, notice: 'Task change was successfully created.' }
        format.json { render json: @task_changes, status: :created, location: @task_changes }
      else
        format.html { render action: "new" }
        format.json { render json: @task_changes.errors, status: :unprocessable_entity }
      end
    end
  end

  # PUT /task_changes/1
  # PUT /task_changes/1.json
  def update
    @task_changes = TaskChange.find(params[:id])

    respond_to do |format|
      if @task_changes.update_attributes(params[:task_change])
        format.html { redirect_to @task, notice: 'task_change was successfully updated.' }
        format.json { head :no_content }
      else
        format.html { render action: "edit" }
        format.json { render json: @task_changes.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /task_changes/1
  # DELETE /task_changes/1.json
  def destroy
    @task_changes = TaskChange.find(params[:id])
    @task_changes.destroy

    respond_to do |format|
      format.html { redirect_to tasks_url }
      format.json { head :no_content }
    end
  end
end