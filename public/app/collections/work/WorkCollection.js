define([
  'jquery',
  'underscore',
  'backbone',
  'models/task/TaskModel'
], function($, _, Backbone, WorkModel){
  
  var WorkCollection = Backbone.Collection.extend({
    model: WorkModel,
    urlRoot: "/tasks"

  });
  
  return WorkCollection;

});
