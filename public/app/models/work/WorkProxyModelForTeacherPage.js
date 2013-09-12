define([
  'underscore',
  'backbone',
  'models/work/WorkModel'
], function(_, Backbone, WorkModel) {

  var WorkProxyModelForTeacherPage = Backbone.Model.extend({
    initialize : function (attributes) {
      this.set('id', attributes.id);
      this.set('name', attributes.name);
      this.set('progress', attributes.progress);
      this.set('student_id', attributes.student_id);
      //this.set('teacher_id', attributes.teacher_id);

      // get from student model?
      this.set('student_full_name', attributes.last_name + ' ' +attributes.first_name + ' ' + attributes.middle_name);
      this.set('group_name', attributes.group_name);
      //this.set('group_pending', attributes.group_pending);
      //this.set('email', attributes.email);
      this.set('name_with_url', '<a href=#/work/' + this.get('id') + '>' + this.get('student_full_name')+'</a>');
      //end

      // From Student -> Group -> Course.Name
      this.set('course_name', attributes.course_name);
      //

      this.set('sort', false);
      return this;
    }
  });

  return WorkProxyModelForTeacherPage;

});