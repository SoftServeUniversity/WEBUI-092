describe('Work Model :: says stuff', function() {

  beforeEach(function(){
    var that = this;
    require(['models/faculty/FacultyModel'], function(FacultyModel) {
      that.faculty = new FacultyModel();
    })
  });
  
  //цей виконається (work має метод sayBuhaha, що повертає 'bu-ha-ha')
  it('should be able to say show workmodel', function(){
     expect(this.faculty.get('id') && this.faculty.get('name') && this.faculty.get('num_students') && this.faculty.get('num_groups') && this.faculty.get('img')).toBeDefined(); 
  });

});