class ThesisChangesController < ApplicationController
  # GET /thesis_changes
  # GET /thesis_changes.json
  def index
    @thesis_changes = ThesisChange.all

    respond_to do |format|
      format.html # index.html.erb
      format.json { render json: @thesis_changes }
    end
  end

  # GET /thesis_changes/1
  # GET /thesis_changes/1.json
  def show
    @thesis_change = ThesisChange.find(params[:id])

    respond_to do |format|
      format.html # show.html.erb
      format.json { render json: @thesis_change }
    end
  end

  # GET /thesis_changes/new
  # GET /thesis_changes/new.json
  def new
    @thesis_change = ThesisChange.new

    respond_to do |format|
      format.html # new.html.erb
      format.json { render json: @thesis_change }
    end
  end

  # GET /thesis_changes/1/edit
  def edit
    @thesis_change = ThesisChange.find(params[:id])
  end

  # POST /thesis_changes
  # POST /thesis_changes.json
  def create
    @thesis_change = ThesisChange.new(params[:thesis_change])

    respond_to do |format|
      if @thesis_change.save
        format.html { redirect_to @thesis_change, notice: 'Thesis change was successfully created.' }
        format.json { render json: @thesis_change, status: :created, location: @thesis_change }
      else
        format.html { render action: "new" }
        format.json { render json: @thesis_change.errors, status: :unprocessable_entity }
      end
    end
  end

  # PUT /thesis_changes/1
  # PUT /thesis_changes/1.json
  def update
    @thesis_change = ThesisChange.find(params[:id])

    respond_to do |format|
      if @thesis_change.update_attributes(params[:thesis_change])
        format.html { redirect_to @thesis_change, notice: 'Thesis change was successfully updated.' }
        format.json { head :no_content }
      else
        format.html { render action: "edit" }
        format.json { render json: @thesis_change.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /thesis_changes/1
  # DELETE /thesis_changes/1.json
  def destroy
    @thesis_change = ThesisChange.find(params[:id])
    @thesis_change.destroy

    respond_to do |format|
      format.html { redirect_to thesis_changes_url }
      format.json { head :no_content }
    end
  end
end
