define([
  'underscore',
  'backbone'
], function(_, Backbone) {
  
  var TaskModel = Backbone.Model.extend({
  	urlRoot: '/tasks/',
	defaults: {
	    name: "Завдання №1",
	    work_id: 1
	}
  });

  return TaskModel;

});