class TaskProgressesController < ApplicationController
  # GET /task_progresses
  # GET /task_progresses.json
  def index
    @task_progress = TaskProgress.all
    respond_to do |format|
      format.json { render json: @task_progress }
    end
  end
  def progresses_by_month
    @task_progresses = TaskProgress.where(task_id: params[:task_id])
    counter = 0
    data = []
    @task_progresses.sort_by!{ |elem| elem['created_at'] }  
    @task_progresses.each_with_index do |item, index|
        newIndex = index + 1
        month = item['created_at'].to_s.split('-')[1]
        if newIndex == @task_progresses.length 
          data[counter] = item["progress"]
          break
        end
        prevmonth = @task_progresses[newIndex]["created_at"].to_s.split('-')[1]
          unless month == prevmonth
              data[counter] = item["progress"]
              counter = counter + 1
          end
    end
    respond_to do |format|
      format.json { render json: data }
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

  # GET /task_progresses/1.json
  def show
    @task_progress = TaskProgress.find(params[:id])
    # @task_progress["params"] = params
    respond_to do |format|
      format.html # show.html.erb
      format.json { render json: @task_progress }
    end
  end

  # # GET /task_progresses/new.json
  # def new
  #   @task_progress = TaskProgress.new

  #   respond_to do |format|
  #     format.html # new.html.erb
  #     format.json { render json: @task_progress }
  #   end
  # end
  
  # POST /task_progresses
  # POST /task_progresses.json
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

  # PUT /task_progresses/1
  # PUT /task_progresses/1.json
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

  # DELETE /task_progresses/1
  # DELETE /task_progresses/1.json
  def destroy
    @task_progress = Task.find(params[:id])
    @task_progress.destroy

    respond_to do |format|
      format.html { redirect_to tasks_url }
      format.json { head :no_content }
    end
  end
end
