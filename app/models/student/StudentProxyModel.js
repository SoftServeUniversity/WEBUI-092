define([
  'underscore',
  'backbone',
  'models/student/StudentModel'
], function(_, Backbone, StudentModel) {

  var StudentProxyModel = Backbone.Model.extend({
    initialize : function (attributes) {
        var student = new StudentModel( {id: attributes.id});
        console.log(this);
        this.set('name', attributes.name +' ' +attributes.patronymic + ' ' + attributes.surname);
        this.set('progress', attributes.progress) ;
        this.set('name_with_url', '<a href=#/work/'+this.id+'>'+this.get('name')+'</a>');
        return student;
    }
  });

  return StudentProxyModel;

});