describe('Work Model :: says stuff', function() {

  beforeEach(function(){
    var that = this;
    require(['models/work/WorkTasksModel'], function(WorkTasksModel) {
      that.work = new WorkTasksModel();
    })
  });
  
  //цей виконається (work має метод sayBuhaha, що повертає 'bu-ha-ha')
  it('should be able to say show workmodel', function(){
    expect(this.work.defaults.sayShowWorkModel()).toBe('show workmodel');
  });

});