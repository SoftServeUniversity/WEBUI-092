define([
  'underscore',
  'backbone',
  'models/student/StudentModel'
], function(_, Backbone, StudentModel) {

  var StudentProxyModelForTeacherPage = Backbone.Model.extend({
    initialize : function (attributes) {
        console.info(attributes);
        var student = new StudentModel( {id: attributes.id});
        this.set('name', attributes.last_name + ' ' +attributes.first_name + ' ' + attributes.middle_name);
        this.set('work', attributes.work);
        this.set('progress', attributes.progress);
        this.set('name_with_url', '<a href=#/work/' + attributes.id_student + '>' +this.get('name')+'</a>');
        return student;
    }
  });

  return StudentProxyModelForTeacherPage;

});