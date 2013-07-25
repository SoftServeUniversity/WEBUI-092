define([
  'jquery',
  'underscore',
  'backbone',
  'models/work/WorkTasksModel'
], function($, _, Backbone, WorkTasksModel){
  
  var WorkCollection = Backbone.Collection.extend({
  	model: WorkTasksModel,
  	url: 'app/mocks/work/worktasks.json'

  });
  
  return WorkCollection;

});
