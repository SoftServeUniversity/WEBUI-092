define([
  'underscore',
  'backbone',
  'models/task/TaskModel'
], function(_, Backbone, TaskModel) {

  var TaskProxyModel = Backbone.Model.extend({
    initialize : function (attributes) {
        var task = new TaskModel( {id: attributes.id});
        console.log(this);
        this.set('name', attributes.description);
        this.set('progress', attributes.percentage) ;
        return task;
    }
  });

  return TaskProxyModel;

});