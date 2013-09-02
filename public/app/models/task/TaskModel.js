define([
  'underscore',
  'backbone'
], function(_, Backbone) {
  
  var TaskModel = Backbone.Model.extend({
  urlRoot: "http://localhost:3000/tasks",
  defaults: {
       "progress": 36

  }

  });

  return TaskModel;

});
