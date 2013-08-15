require 'spec_helper'

	describe Department do
	  before { @department = Departmentt.new name: 'Department name' }
	  subject { @department }

	  it { should respond_to(:name)}
	  it { should be_valid}
	  it "name should not be more than 45 symbols" do
	    unvalid_post = Department.new name: ("*"*46)
	    unvalid_post.should_not be_valid
	end

end