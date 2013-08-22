require "spec_helper"

describe ProgressChangesController do
  describe "routing" do

    it "routes to #index" do
      get("/progress_changes").should route_to("progress_changes#index")
    end

    it "routes to #new" do
      get("/progress_changes/new").should route_to("progress_changes#new")
    end

    it "routes to #show" do
      get("/progress_changes/1").should route_to("progress_changes#show", :id => "1")
    end

    it "routes to #edit" do
      get("/progress_changes/1/edit").should route_to("progress_changes#edit", :id => "1")
    end

    it "routes to #create" do
      post("/progress_changes").should route_to("progress_changes#create")
    end

    it "routes to #update" do
      put("/progress_changes/1").should route_to("progress_changes#update", :id => "1")
    end

    it "routes to #destroy" do
      delete("/progress_changes/1").should route_to("progress_changes#destroy", :id => "1")
    end

  end
end
