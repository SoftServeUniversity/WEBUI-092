define([
  'underscore',
  'backbone'
], function(_, Backbone) {
  
  var TaskModel = Backbone.Model.extend({
  urlRoot: "/tasks",
  defaults: {
       "progress": 36

  }

  });

  return TaskModel;

});
