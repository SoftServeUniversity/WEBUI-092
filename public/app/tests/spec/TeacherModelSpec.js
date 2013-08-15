describe('Teacher Model :: says stuff', function() {

  beforeEach(function(){
    var that = this;
    require(['models/teacher/TeacherModel'], function(TeacherModel) {
      that.teacher = new TeacherModel();
    })
  });
  
  //цей виконається (teacher має метод sayBuhaha, що повертає 'bu-ha-ha')
  it('should be able to say bu-ha-ha', function(){
    expect(this.teacher.defaults.sayBuhaha()).toBe('bu-ha-ha');
  });
  
  //тут буде помилочка
  /*it('should be able to say chuchuka', function(){
    expect(this.teacher.defaults.sayChuchuka()).toEqual("chuchuka");
  });*/

});