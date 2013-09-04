define([
  'underscore',
  'backbone'
], function(_, Backbone) {
  
  var ProcessModel = Backbone.Model.extend({
    urlRoot: "/task_progresses"
  });

  return ProcessModel;

});
