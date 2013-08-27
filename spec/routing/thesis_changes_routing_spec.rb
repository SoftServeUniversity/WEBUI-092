require "spec_helper"

describe ThesisChangesController do
  describe "routing" do

    it "routes to #index" do
      get("/thesis_changes").should route_to("thesis_changes#index")
    end

    it "routes to #new" do
      get("/thesis_changes/new").should route_to("thesis_changes#new")
    end

    it "routes to #show" do
      get("/thesis_changes/1").should route_to("thesis_changes#show", :id => "1")
    end

    it "routes to #edit" do
      get("/thesis_changes/1/edit").should route_to("thesis_changes#edit", :id => "1")
    end

    it "routes to #create" do
      post("/thesis_changes").should route_to("thesis_changes#create")
    end

    it "routes to #update" do
      put("/thesis_changes/1").should route_to("thesis_changes#update", :id => "1")
    end

    it "routes to #destroy" do
      delete("/thesis_changes/1").should route_to("thesis_changes#destroy", :id => "1")
    end

  end
end
