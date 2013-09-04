define([
  'jquery',
  'underscore',
  'backbone',
  'models/task/TaskModel'
], function($, _, Backbone, WorkModel){
  
  var WorkCollection = Backbone.Collection.extend({
    model: WorkModel,
    url: "/tasks/"

  });
  
  return WorkCollection;

});
