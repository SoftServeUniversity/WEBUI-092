require 'spec_helper'

describe "Teachers" do
  describe "GET /teachers" do
    it "works! (now write some real specs)" do
      # Run the generator again with the --webrat flag if you want to use webrat methods/matchers
      get teachers_path
      response.status.should be(200)
    end
  end
end
