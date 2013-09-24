define([
  'underscore',
  'backbone',
  'models/work/WorkModel'
], function(_, Backbone, WorkModel) {

  var WorkProxyModelForTeacherPage = Backbone.Model.extend({
    urlRoot: "/works/",
    initialize : function (attributes) {
      this.set('id', attributes.id);
      this.set('name', attributes.name);
      this.set('progress', attributes.progress);
      this.set('student_id', attributes.student_id);
      this.set('student_full_name',
                    attributes.student.last_name + ' ' +
                    attributes.student.name + ' ' +
                    attributes.student.middle_name);
      this.set('group_name', attributes.student.group_name);
      this.set('name_with_url', '<a href=#/work/' + this.get('id') + '>' + this.get('student_full_name')+'</a>');
      this.set('course_name', attributes.student.course_name);

      return this;
    }
  });

  return WorkProxyModelForTeacherPage;

});