define([
  'underscore',
  'backbone',
  'models/work/WorkModel'
], function(_, Backbone, WorkModel) {

  var WorkProxyModelForTeacherPage = Backbone.Model.extend({
    initialize : function (attributes) {
        console.log(WorkProxyModelForTeacherPage);
        this.set('id', attributes.id);
        this.set('full_name', attributes.last_name + ' ' +attributes.first_name + ' ' + attributes.middle_name);
        this.set('work_id', attributes.work_id);
        this.set('work_name', attributes.work_name);
        this.set('group_name', attributes.group_name);
        this.set('group_pending', attributes.group_pending);
        this.set('email', attributes.email);
        this.set('progress', attributes.progress);
        this.set('name_with_url', '<a href=#/work/' + this.get('work_id') + '>' + this.get('full_name')+'</a>');
        this.set('sort', false);
        return this;
    }
  });

  //console.log(StudentProxyModelForTeacherPage);

  return WorkProxyModelForTeacherPage;

});