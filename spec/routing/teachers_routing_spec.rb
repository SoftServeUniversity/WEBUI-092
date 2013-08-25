require "spec_helper"

describe TeachersController do
  describe "routing" do

    it "routes to #index" do
      get("/teachers").should route_to("teachers#index")
    end

    it "routes to #new" do
      get("/teachers/new").should route_to("teachers#new")
    end

    it "routes to #show" do
      get("/teachers/1").should route_to("teachers#show", :id => "1")
    end

    it "routes to #edit" do
      get("/teachers/1/edit").should route_to("teachers#edit", :id => "1")
    end

    it "routes to #create" do
      post("/teachers").should route_to("teachers#create")
    end

    it "routes to #update" do
      put("/teachers/1").should route_to("teachers#update", :id => "1")
    end

    it "routes to #destroy" do
      delete("/teachers/1").should route_to("teachers#destroy", :id => "1")
    end

  end
end
