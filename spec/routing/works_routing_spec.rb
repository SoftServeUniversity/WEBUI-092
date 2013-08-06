require "spec_helper"

describe WorksController do
  describe "routing" do

    it "routes to #index" do
      get("/works").should route_to("works#index")
    end

    it "routes to #new" do
      get("/works/new").should route_to("works#new")
    end

    it "routes to #show" do
      get("/works/1").should route_to("works#show", :id => "1")
    end

    it "routes to #edit" do
      get("/works/1/edit").should route_to("works#edit", :id => "1")
    end

    it "routes to #create" do
      post("/works").should route_to("works#create")
    end

    it "routes to #update" do
      put("/works/1").should route_to("works#update", :id => "1")
    end

    it "routes to #destroy" do
      delete("/works/1").should route_to("works#destroy", :id => "1")
    end

  end
end
