define([
  'underscore',
  'backbone',
  'models/student/StudentModel'
], function(_, Backbone, StudentModel) {

  var StudentProxyModelForTeacherPage = Backbone.Model.extend({
    initialize : function (attributes) {
        var student = new StudentModel({id: attributes.id});
        this.set('name', attributes.last_name + ' ' +attributes.first_name + ' ' + attributes.middle_name);
        this.set('work_id', attributes.work_id);
        this.set('work_name', attributes.work_name);
        this.set('progress', attributes.progress);
        this.set('name_with_url', '<a href=#/work/' + attributes.work_id + '>' +this.get('name')+'</a>');
        return student;
    }
  });

  return StudentProxyModelForTeacherPage;

});