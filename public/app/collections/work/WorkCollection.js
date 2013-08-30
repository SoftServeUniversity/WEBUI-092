define([
  'jquery',
  'underscore',
  'backbone',
  'models/task/TaskModel'
], function($, _, Backbone, TaskModel){
  
  var WorkCollection = Backbone.Collection.extend({
  	model: TaskModel,
  	//url: 'app/mocks/work/worktasks.json'
  	url: '/works/'
  });
  
  return WorkCollection;

});
