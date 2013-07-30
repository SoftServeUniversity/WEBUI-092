define([
  'underscore',
  'backbone',
  'models/task/TaskModel'
], function(_, Backbone, TaskModel) {

  var TaskProxyModel = Backbone.Model.extend({
    initialize : function (attributes) {
        var task = new TaskModel( {id: attributes.id});
        this.set('name', attributes.description);
        this.set('progress', attributes.percentage) ;
        this.set('name_with_url', '<a href=#/task/'+this.id+'>'+this.get('name')+'</a>');
        return task;
    }
  });

  return TaskProxyModel;

});