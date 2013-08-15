describe('Task Model', function() {

  beforeEach(function(){
    me = this;
    require(['models/task/TaskModel'], function(TaskModel) {
      me.defTask = new TaskModel();
      me.currTask = new TaskModel({
        "name": "Super Task",
        "process": 77,
        "thesis": 12
      });
      me.unvalidTask = new TaskModel({
        "name": "",
        "process": -7
      })

    })
  });

  it('should have defaults', function(){  
    console.log(this.unvalidTask)
    expect( this.defTask.get("id") &&
            this.defTask.get("name") &&
            this.defTask.get("process") &&
            this.defTask.get("thesis")).toBeDefined();
    });

  it('should have current values', function(){
    expect(this.currTask.get("name")).toEqual("Super Task");
    expect(this.currTask.get("process")).toEqual(77);
    expect(this.currTask.get("thesis")).toEqual(12);
  });
});