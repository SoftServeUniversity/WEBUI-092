class FacultyAdminsController < ApplicationController
  # GET /faculty_admins.html
  # GET /faculty_admins.json
  
  #include FacultyAdminsHelper

  def index

    if params['filter'] === nil
      @fa = FacultyAdmin.all
    else
      @fa = FacultyAdmin.where(params['filter'])
    end

    respond_to do |format|
      format.json { render json: @fa }
    end

  end

  # GET /FacultyAdmins/1
  # GET /FacultyAdmins/1.json
  def show
    @fa = FacultyAdmin.find(params[:id])

    puts @fa

    respond_to do |format|
      #format.html # show.html.erb
      format.json { render json: @fa }
    end
  end

  # GET /FacultyAdmins/new
  # GET /FacultyAdmins/new.json
  def new
    @fa = FacultyAdmin.new

    respond_to do |format|
      format.html # new.html.erb
      format.json { render json: @fa }
    end
  end

  # GET /FacultyAdmins/1/edit
  def edit
    @fa = FacultyAdmin.find(params[:id])
  end

  # POST /FacultyAdmins
  # POST /FacultyAdmins.json
  def create
    @fa = FacultyAdmin.new(params[:fa])

    respond_to do |format|
      if @fa.save
        format.html { redirect_to @fa, notice: 'FacultyAdmin was successfully created.' }
        format.json { render json: @fa, status: :created, location: @fa }
      else
        format.html { render action: "new" }
        format.json { render json: @fa.errors, status: :unprocessable_entity }
      end
    end
  end

  # PUT /FacultyAdmins/1
  # PUT /FacultyAdmins/1.json
  def update
    #params = parse_parametrs(params)
    @fa = FacultyAdmin.find(params[:id])

    respond_to do |format|
      if @fa.update_attributes(params[:FacultyAdmin]) &&
         @fa.user.update_attributes({:name => params[:name],
                                          :last_name => params[:last_name],
                                          :middle_name => params[:middle_name],
                                          :role_pending => params[:role_pending]
                                          })

        format.html { redirect_to @fa, notice: 'FacultyAdmin was successfully updated.' }
        format.json { head :no_content }
      else
        format.html { render action: "edit" }
        format.json { render json: @fa.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /FacultyAdmins/1
  # DELETE /FacultyAdmins/1.json
  def destroy
    @fa = FacultyAdmin.find(params[:id])
    @fa.destroy

    respond_to do |format|
      format.html { redirect_to FacultyAdmins_url }
      format.json { head :no_content }
    end
  end
end
