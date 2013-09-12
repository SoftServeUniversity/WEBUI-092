class WorksController < ApplicationController
  # GET /works
  # GET /works.json
  def index

    if params['filter'] === nil
      @works = Work.all
    else
      @works = Work.where(params['filter'])
    end

    respond_to do |format|
      format.html # index.html.erb
      format.json { render json: @works }
    end
  end

  # GET /works/1
  # GET /works/1.json
  def show
    @work = Work.find(params[:id])

    respond_to do |format|
      format.html # show.html.erb
      format.json { render json: @work.to_json(:include => {
        :thesis_changes => {},
        :tasks => {:include => :thesis_changes}
      })}
    end
  end

  #get /work/:id/tasks
  def show_tasks
    @tasks = Task.where(work_id: params[:id]).order("priority ASC")

    respond_to do |format|
      format.json { render json: @tasks }
    end
  end
  
  #get /work/teacher_id:id/
  def show_works_of_teacher
    @works = Works.where(teacher_id: params[:id])

    puts @works

    respond_to do |format|
      format.json { render json: @works }
    end
  end

  # get work/:id/tasks/progresses
  def show_tasks_with_progresses
    @tasks = Task.where(work_id: params[:id]).order("priority ASC")
    @progresses = []
    @tasks.each do |task|
      @progresses.push(TaskProgress.where(task_id: task.id).last)
    end
    respond_to do |format|
      format.json { render json: @progresses }
    end

  end

  # GET /works/new
  # GET /works/new.json
  def new
    @work = Work.new

    respond_to do |format|
      format.json { render json: @work }
    end
  end

  # GET /works/1/edit
  def edit
    @work = Work.find(params[:id])
  end

  # POST /works
  # POST /works.json
  def create
    @work = Work.new(params[:work])

    respond_to do |format|
      if @work.save
        format.html { redirect_to @work, notice: 'Work was successfully created.' }
        format.json { render json: @work, status: :created, location: @work }
      else
        format.html { render action: "new" }
        format.json { render json: @work.errors, status: :unprocessable_entity }
      end
    end
  end

  # PUT /works/1
  # PUT /works/1.json
  def update
    @work = Work.find(params[:id])

    respond_to do |format|
      if @work.update_attributes(params[:work])
        format.html { redirect_to @work, notice: 'Work was successfully updated.' }
        format.json { head :no_content }
      else
        format.html { render action: "edit" }
        format.json { render json: @work.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /works/1
  # DELETE /works/1.json
  def destroy
    @work = Work.find(params[:id])
    @work.destroy

    respond_to do |format|
      format.html { redirect_to works_url }
      format.json { head :no_content }
    end
  end
end
