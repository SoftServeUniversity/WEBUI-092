define([
  'underscore',
  'backbone',
  'models/student/StudentModel'
], function(_, Backbone, StudentModel) {

  var StudentProxyModel = Backbone.Model.extend({
    initialize : function (attributes) {
        var student = new StudentModel( {id: attributes.id});
        this.set('name', attributes.name +' ' +attributes.middle_name + ' ' + attributes.last_name);
        this.set('progress', attributes.progress) ;
        this.set('name_with_url', '<a href=#/student/'+this.id+'>'+this.get('name')+'</a>');
        return student;
    }
  });

  return StudentProxyModel;

});