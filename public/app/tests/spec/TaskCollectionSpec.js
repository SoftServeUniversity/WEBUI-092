describe("Task Collection", function() {
    beforeEach(function(){
    me = this;
    require(['collections/tasks/TasksCollection'], function(TasksCollection) {
      me.tasks = new TasksCollection();
      me.populatedTasks = new TasksCollection([
        { "id": 1, "name": "завдання №1", "process": 1,   "thesis": 1 },
        { "id": 2, "name": "завдання №2", "process": 4,   "thesis": 3 },
        { "id": 3, "name": "завдання №3", "process": 34,  "thesis": 2 }
      ])
    })
  });
  it("should have the default model", function() {
    expect(this.tasks.model).toBeDefined();
  });
  it('should have return /true/ after fetching', function(){  
    expect(this.tasks.fetch({async:false, success: function () { return true }})).toBeTruthy();
  });

  it("should have array with current models", function() {
    expect(this.populatedTasks.models instanceof Array).toBeTruthy();
  });
  it("should have at least one modfel", function() {
    expect(this.populatedTasks.models.length > 0);
  });
});