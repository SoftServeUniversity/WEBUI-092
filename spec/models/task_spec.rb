require 'spec_helper'

describe Task do
	before(:each) do
		@valid_task = Task.new name: 'Obi Van', work_id: 1
    @unvalid_task = Task.new name: '', work_id: -99
    @task_work = @valid_task.work_id
	end

  it 'should have a correct name' do
    @valid_task.name.should eq "Obi Van"
  end
  
  it 'should have a correct work_id' do
    @task_work.should eq 1
  end

  it 'should have a valid name and work_id' do
    @unvalid_task.should_not be_valid
  end

end