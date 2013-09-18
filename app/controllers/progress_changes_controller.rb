class ProgressChangesController < ApplicationController
  # GET /progress_changes
  # GET /progress_changes.json
  def index
    @progress_changes = ProgressChange.where(params['filter'])
    @progress_changes.sort_by!{|e| e[:created_at]}

    respond_to do |format|
      format.html # index.html.erb
      format.json { render json: @progress_changes }
    end
  end

  # GET /progress_changes/1
  # GET /progress_changes/1.json
  def show
    @progress_change = ProgressChange.find(params[:id])

    respond_to do |format|
      format.html # show.html.erb
      format.json { render json: @progress_change }
    end
  end

  # GET /progress_changes/new
  # GET /progress_changes/new.json
  def new
    @progress_change = ProgressChange.new

    respond_to do |format|
      format.html # new.html.erb
      format.json { render json: @progress_change }
    end
  end

  # GET /progress_changes/1/edit
  def edit
    @progress_change = ProgressChange.find(params[:id])
  end

  # POST /progress_changes
  # POST /progress_changes.json
  def create
    @progress_change = ProgressChange.new(params[:progress_change])

    respond_to do |format|
      if @progress_change.save
        format.html { redirect_to @progress_change, notice: 'Progress change was successfully created.' }
        format.json { render json: @progress_change, status: :created, location: @progress_change }
      else
        format.html { render action: "new" }
        format.json { render json: @progress_change.errors, status: :unprocessable_entity }
      end
    end
  end

  # PUT /progress_changes/1
  # PUT /progress_changes/1.json
  def update
    @progress_change = ProgressChange.find(params[:id])

    respond_to do |format|
      if @progress_change.update_attributes(params[:progress_change])
        format.html { redirect_to @progress_change, notice: 'Progress change was successfully updated.' }
        format.json { head :no_content }
      else
        format.html { render action: "edit" }
        format.json { render json: @progress_change.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /progress_changes/1
  # DELETE /progress_changes/1.json
  def destroy
    @progress_change = ProgressChange.find(params[:id])
    @progress_change.destroy

    respond_to do |format|
      format.html { redirect_to progress_changes_url }
      format.json { head :no_content }
    end
  end

end