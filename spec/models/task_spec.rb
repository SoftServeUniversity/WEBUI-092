require 'spec_helper'

describe Task do
	before(:each) do
		@task = Task.new name: 'Obi Van', work_id: 1
    @task_work = @task.work_id
	end

  it 'should have a correct name' do
    @task.name.should eq "Obi Van"
  end
  
  it 'should have a correct work_id' do
    @task_work.should eq 1
  end


end