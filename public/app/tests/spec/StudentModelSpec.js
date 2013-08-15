describe('StudentModel', function() {

  beforeEach(function(){
    var that = this;
    require(['models/student/StudentModel'], function(StudentModel) {
      that.student = new StudentModel();
    })
  });

  it('should have default fields', function(){
     expect(this.student.get('id') && this.student.get('name') && this.student.get('patronymic') && this.student.get('surname')).toBeDefined();
  });

});