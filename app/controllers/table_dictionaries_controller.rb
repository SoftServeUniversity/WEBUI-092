class TableDictionariesController < ApplicationController
  # GET /table_dictionaries
  # GET /table_dictionaries.json
  def index
    @table_dictionaries = TableDictionary.all

    respond_to do |format|
      format.html # index.html.erb
      format.json { render json: @table_dictionaries }
    end
  end

  # GET /table_dictionaries/1
  # GET /table_dictionaries/1.json
  def show
    @table_dictionary = TableDictionary.find(params[:id])

    respond_to do |format|
      format.html # show.html.erb
      format.json { render json: @table_dictionary }
    end
  end

  # GET /table_dictionaries/new
  # GET /table_dictionaries/new.json
  def new
    @table_dictionary = TableDictionary.new

    respond_to do |format|
      format.html # new.html.erb
      format.json { render json: @table_dictionary }
    end
  end

  # GET /table_dictionaries/1/edit
  def edit
    @table_dictionary = TableDictionary.find(params[:id])
  end

  # POST /table_dictionaries
  # POST /table_dictionaries.json
  def create
    @table_dictionary = TableDictionary.new(params[:table_dictionary])

    respond_to do |format|
      if @table_dictionary.save
        format.html { redirect_to @table_dictionary, notice: 'Table dictionary was successfully created.' }
        format.json { render json: @table_dictionary, status: :created, location: @table_dictionary }
      else
        format.html { render action: "new" }
        format.json { render json: @table_dictionary.errors, status: :unprocessable_entity }
      end
    end
  end

  # PUT /table_dictionaries/1
  # PUT /table_dictionaries/1.json
  def update
    @table_dictionary = TableDictionary.find(params[:id])

    respond_to do |format|
      if @table_dictionary.update_attributes(params[:table_dictionary])
        format.html { redirect_to @table_dictionary, notice: 'Table dictionary was successfully updated.' }
        format.json { head :no_content }
      else
        format.html { render action: "edit" }
        format.json { render json: @table_dictionary.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /table_dictionaries/1
  # DELETE /table_dictionaries/1.json
  def destroy
    @table_dictionary = TableDictionary.find(params[:id])
    @table_dictionary.destroy

    respond_to do |format|
      format.html { redirect_to table_dictionaries_url }
      format.json { head :no_content }
    end
  end
end
