require "spec_helper"

describe TableDictionariesController do
  describe "routing" do

    it "routes to #index" do
      get("/table_dictionaries").should route_to("table_dictionaries#index")
    end

    it "routes to #new" do
      get("/table_dictionaries/new").should route_to("table_dictionaries#new")
    end

    it "routes to #show" do
      get("/table_dictionaries/1").should route_to("table_dictionaries#show", :id => "1")
    end

    it "routes to #edit" do
      get("/table_dictionaries/1/edit").should route_to("table_dictionaries#edit", :id => "1")
    end

    it "routes to #create" do
      post("/table_dictionaries").should route_to("table_dictionaries#create")
    end

    it "routes to #update" do
      put("/table_dictionaries/1").should route_to("table_dictionaries#update", :id => "1")
    end

    it "routes to #destroy" do
      delete("/table_dictionaries/1").should route_to("table_dictionaries#destroy", :id => "1")
    end

  end
end
