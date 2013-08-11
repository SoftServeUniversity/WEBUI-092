require 'spec_helper'

describe Faculty do
  before { @faculty = Faculty.new name: 'Faculty name' }
  subject { @faculty }

  it { should respond_to(:name)}
  it { should be_valid}
  it "name should not be more than 45 symbols" do
    unvalid_post = Faculty.new name: ("*"*46)
    unvalid_post.should_not be_valid
  end


end
