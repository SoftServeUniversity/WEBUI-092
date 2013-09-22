class TeachersController < ApplicationController
  # GET /teachers
  # GET /teachers.json
  include TeachersHelper

  def index
    if params[:search] == "true"
      puts '---------------------------------------------------SEARCH----------------------------------------------------------'
      search_string = "
        SELECT * 
        FROM teachers INNER JOIN users ON teachers.user_id = users.id
        WHERE last_name LIKE '" + params[:two_last_name] + "%'"
      puts search_string
      @teachers = Teacher.find_by_sql(search_string)
    else
      if params['filter'] === nil
        @teachers = Teacher.all
      elsif params['filter']['faculty_id']
        @teachers = Faculty.find(params['filter']['faculty_id']).teachers
      else
        @teachers = Teacher.where(params['filter'])
      end
    end

    respond_to do |format|
      format.json { render json: @teachers }
    end
  end

  # GET /teachers/1
  # GET /teachers/1.json
  def show
    @teacher = Teacher.find(params[:id])

    respond_to do |format|
      #format.html # show.html.erb
      format.json { render json: @teacher }
    end
  end

  # GET /teachers/new
  # GET /teachers/new.json
  def new
    @teacher = Teacher.new

    respond_to do |format|
      format.html # new.html.erb
      format.json { render json: @teacher }
    end
  end

  # GET /teachers/1/edit
  def edit
    @teacher = Teacher.find(params[:id])
  end

  # POST /teachers
  # POST /teachers.json
  def create
    @teacher = Teacher.new(params[:teacher])

    respond_to do |format|
      if @teacher.save
        format.html { redirect_to @teacher, notice: 'Teacher was successfully created.' }
        format.json { render json: @teacher, status: :created, location: @teacher }
      else
        format.html { render action: "new" }
        format.json { render json: @teacher.errors, status: :unprocessable_entity }
      end
    end
  end

  # PUT /teachers/1
  # PUT /teachers/1.json
  def update
    #params = parse_parametrs(params)
    @teacher = Teacher.find(params[:id])

    respond_to do |format|
      if @teacher.update_attributes(params[:teacher]) &&
         @teacher.user.update_attributes({:name => params[:name],
                                          :last_name => params[:last_name],
                                          :middle_name => params[:middle_name],
                                          :role_pending => params[:role_pending]
                                          })

        format.html { redirect_to @teacher, notice: 'Teacher was successfully updated.' }
        format.json { head :no_content }
      else
        format.html { render action: "edit" }
        format.json { render json: @teacher.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /teachers/1
  # DELETE /teachers/1.json
  def destroy
    @teacher = Teacher.find(params[:id])
    @teacher.destroy

    respond_to do |format|
      format.html { redirect_to teachers_url }
      format.json { head :no_content }
    end
  end
end
