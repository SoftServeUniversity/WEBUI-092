class TaskProgressesController < ApplicationController
  # GET /tasks
  # GET /tasks.json
  def index
    @task_progress = TaskProgress.all
    respond_to do |format|
      format.html # show.html.erb
      format.json { render json: @task_progress }
    end
  end
  
    # GET /tasks/:task_id/task_progresses.json
    def task_id_index
    @task_progresses = TaskProgress.where(task_id: params[:task_id])
    respond_to do |format|
      format.html # show.html.erb
      format.json { render json: @task_progresses }
    end
  end
    # GET /tasks/:task_id/task_progress.json
  def task_id_show
    @task_progress = TaskProgress.where(task_id: params[:task_id]).last
    respond_to do |format|
      format.html # show.html.erb
      format.json { render json: @task_progress }
    end
  end

  # GET /tasks/1
  # GET /tasks/1.json
  def show
    @task_progress = TaskProgress.find(params[:id])
    # @task_progress["params"] = params
    respond_to do |format|
      format.html # show.html.erb
      format.json { render json: @task_progress }
    end
  end

  # GET /tasks/new
  # GET /tasks/new.json
  def new
    @task = TaskProgress.new

    respond_to do |format|
      format.html # new.html.erb
      format.json { render json: @task }
    end
  end

  # GET /tasks/1/edit
  def edit
    @task = TaskProgress.find(params[:id])
  end

  # POST /tasks
  # POST /tasks.json
  def create
    @task_progress = TaskProgress.new(params[:task_progress])

    respond_to do |format|
      if @task_progress.save
        format.html { redirect_to @task_progress, notice: 'task_progress was successfully created.' }
        format.json { render json: @task_progress, status: :created }
      else
        format.html { render action: "new" }
        format.json { render json: @task_progress.errors, status: :unprocessable_entity }
      end
    end
  end

  # PUT /tasks/1
  # PUT /tasks/1.json
  def update
    @task_progress = TaskProgress.find(params[:id])

    respond_to do |format|
      if @task_progress.update_attributes(params[:task_progress])
        format.html { redirect_to @task_progress, notice: 'task_progress was successfully updated.' }
        format.json { head :no_content }
      else
        format.html { render action: "edit" }
        format.json { render json: @task_progress.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /tasks/1
  # DELETE /tasks/1.json
  def destroy
    @task = Task.find(params[:id])
    @task.destroy

    respond_to do |format|
      format.html { redirect_to tasks_url }
      format.json { head :no_content }
    end
  end
end
