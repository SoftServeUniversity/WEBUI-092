class InfoController < ApplicationController


  # GET /info
  # GET /faculties.json
  # get contents of text file
  def index
    respond_to do |format|
      
      @file_path = "public/infopage.html"
      @content = File.read (@file_path)

      format.json { render json: @content }
    end 
  end
 
  # POST
  # update text file
  def create
    respond_to do |format|
      
      @file_path = "public/infopage.html"
      File.open(@file_path, "w") do |f|
        f.write(params[:content])
      end

      format.json { render json: params[:content] }
    end
  end

end
