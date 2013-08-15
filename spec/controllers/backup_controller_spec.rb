require 'spec_helper'

describe BackupController do

  describe "GET 'full_backup'" do
    it "returns http success" do
      get 'full_backup'
      response.should be_success
    end
  end

  describe "GET 'restore_from_backup'" do
    it "returns http success" do
      get 'restore_from_backup'
      response.should be_success
    end
  end

end
