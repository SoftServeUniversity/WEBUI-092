describe("Task View", function() {
	var taskView;
  beforeEach(function(){
	var me = this;
    GlobalEventBus = _.extend({}, Backbone.Events);
    runs( function () {
        require(['views/task/taskView'], function(TaskView) {
          taskView = new TaskView();
        })
    });

    waitsFor(function () { return taskView; } , 'Admin view load timeout', 1000);
	});

  it("should have an initialize method", function() {
    expect(typeof taskView.initialize).toBe("function");
  });
  it("should have succeed initialize", function() {
    expect(taskView.initialize()).toBeTruthy();
  });

});