define([
  'underscore',
  'backbone',
  'models/student/StudentModel'
], function(_, Backbone, StudentModel) {

  var StudentProxyModelForTeacherPage = Backbone.Model.extend({
    initialize : function (attributes) {
        var student = new StudentModel({id: attributes.id});
        this.set('full_name', attributes.last_name + ' ' +attributes.first_name + ' ' + attributes.middle_name);
        this.set('work_id', attributes.work_id);
        this.set('work_name', attributes.work_name);
        this.set('group_name', attributes.group_name);
        this.set('email', attributes.email);
        this.set('progress', attributes.progress);
        this.set('name_with_url', '<a href=#/work/' + attributes.work_id + '>' +this.get('full_name')+'</a>');
        return student;
    }
  });

  return StudentProxyModelForTeacherPage;

});