define([
  'underscore',
  'backbone',
  'models/teacher/TeacherModel'
], function(_, Backbone, TeacherModel) {

  var TeacherProxyModel = Backbone.Model.extend({
    initialize : function (attributes) {
        var teacher = new TeacherModel({id: attributes.id});
        this.set('name', attributes.name +' ' +attributes.middle_name + ' ' + attributes.last_name);
        return teacher;
    }
  });

  return TeacherProxyModel;

});