define([
  'jquery',
  'underscore',
  'backbone',
  'models/task/TaskModel'
], function($, _, Backbone, TaskModel){
  
  var WorkCollection = Backbone.Collection.extend({
  	model: TaskModel,
  	url: 'http://localhost:3000/tasks.json'

  });
  
  return WorkCollection;

});
