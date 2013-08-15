define([
  'underscore',
  'backbone'
], function(_, Backbone) {
  
  var TaskModel = Backbone.Model.extend({
	defaults: {
	    "id": Math.round(Math.random()*10e10),
	    "name": "Завдання №1",
	    "process": 36,
	    "thesis": "Дипломна робота"
	}
  });

  return TaskModel;

});