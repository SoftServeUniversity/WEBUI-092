describe('Teacher Model :: says stuff', function() {

  beforeEach(function(){
    var that = this;
    require(['models/teacher/TeacherModel'], function(TeacherModel) {
      that.teacher = new TeacherModel();
    })
  });
  
  it('should be fine', function(){
    expect('test').toBe('test');
  });
  

});
