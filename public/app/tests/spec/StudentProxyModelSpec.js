describe('StudentProxyModel', function() {

  beforeEach(function(){
    var that = this;
    require(['models/student/StudentProxyModel', 'models/student/StudentModel'], function(StudentProxyModel, StudentModel) {
      that.student = new StudentModel();
      that.proxiedStudent = new StudentProxyModel(that.student.attributes);
    })
  });

  it('should have default fields', function(){
    expect(this.proxiedStudent.attributes.name && this.proxiedStudent.attributes.name_with_url && this.proxiedStudent.attributes.progress).toBeDefined();
  });
});