define([
  'underscore',
  'backbone',
  'models/student/StudentModel'
], function(_, Backbone, StudentModel) {

  var StudentProxyModelForTeacherGroupPage = Backbone.Model.extend({
    urlRoot: "/students/",
    initialize : function (attributes) {
      console.log(attributes);
      this.set('id', attributes.id);
      //Warning! Set full student name as 'name' - for add work dialog
      this.set('name',
                    attributes.last_name + ' ' +
                    attributes.name + ' ' +
                    attributes.middle_name);
      this.set('work_id', attributes.work_id);
      this.set('work_name', attributes.work_name);
      this.set('group_name', attributes.group_name);
      this.set('email', attributes.email);
      this.set('progress', attributes.progress);
      this.set('name_with_url', '<a href=#/work/' + attributes.work_id + '>' +this.get('student_full_name')+'</a>');
      return this;
    }
  });

  return StudentProxyModelForTeacherGroupPage;

});