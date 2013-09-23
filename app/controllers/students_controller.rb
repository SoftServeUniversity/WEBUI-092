class StudentsController < ApplicationController
  # GET /students
  # GET /students.json
  def index


    if params[:search] == "true"
      puts '---------------------------------------------------SEARCH----------------------------------------------------------'
      search_string = "
        SELECT students.*, users.name, users.last_name, users.middle_name, groups.course_id, departments.faculty_id
        FROM students INNER JOIN users ON students.user_id = users.id INNER JOIN groups ON group_id = groups.id INNER JOIN departments ON department_id = departments.id
        WHERE last_name LIKE '" + params[:two_last_name] + "%'"
      if params[:s_faculty_id]!= ""
        search_string += " AND faculty_id = " + params[:s_faculty_id]
      end
      if params[:s_course_id]!= ""
        search_string += " AND course_id = " + params[:s_course_id]
      end
      puts search_string
      @students = Student.find_by_sql(search_string)
    else
      if params[:filter] == nil
        @students = Student.all
      else
        @students = Student.where(params[:filter])
      end
    end

    puts @students
    respond_to do |format|
      format.json { render json: @students }
    end

  end

  # GET /students/1
  # GET /students/1.json
  def show
    @student = Student.find(params[:id])

    respond_to do |format|
      format.html # show.html.erb
      format.json { render json: @student }
    end
  end

  # GET /students/new
  # GET /students/new.json
  def new
    @student = Student.new

    respond_to do |format|
      format.html # new.html.erb
      format.json { render json: @student }
    end
  end

  # GET /students/1/edit
  def edit
    @student = Student.find(params[:id])
  end

  # POST /students
  # POST /students.json
  def create
    @student = Student.new(params[:student])

    respond_to do |format|
      if @student.save
        format.html { redirect_to @student, notice: 'Student was successfully created.' }
        format.json { render json: @student, status: :created, location: @student }
      else
        format.html { render action: "new" }
        format.json { render json: @student.errors, status: :unprocessable_entity }
      end
    end
  end

  # PUT /students/1
  # PUT /students/1.json
  def update
    @student = Student.find(params[:id])

    respond_to do |format|
      if @student.update_attributes(params[:student])
        format.html { redirect_to @student, notice: 'Student was successfully updated.' }
        format.json { head :no_content }
      else
        format.html { render action: "edit" }
        format.json { render json: @student.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /students/1
  # DELETE /students/1.json
  def destroy
    @student = Student.find(params[:id])
    @student.destroy

    respond_to do |format|
      format.html { redirect_to students_url }
      format.json { head :no_content }
    end
  end

end
