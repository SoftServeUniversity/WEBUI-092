define([
  'underscore',
  'backbone'
], function(_, Backbone) {
  
  var ProcessModel = Backbone.Model.extend({
    urlRoot: "http://localhost:3000/task_progresses"
  });

  return ProcessModel;

});