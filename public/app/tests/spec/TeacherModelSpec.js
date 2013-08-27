describe('TeacherModel', function() {

  beforeEach(function(){
    var that = this;
    require(['models/teacher/TeacherModel'], function(TeacherModel) {
      that.teacher = new TeacherModel();
    })
  });

  it('should have default fields', function(){
     expect(this.teacher.get('id') &&
            this.student.get('first_name') &&
            this.student.get('middle_name') &&
            this.student.get('last_name') &&
            this.student.get('degree') &&
            this.student.get('userRef') &&
            this.student.get('departmentRef')).toBeDefined();
  });

});