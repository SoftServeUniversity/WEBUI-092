define([
  'underscore',
  'backbone'
], function(_, Backbone) {
  
  var TaskModel = Backbone.Model.extend({
	defaults: {
	    id: Math.round(Math.random()*10e10),
	    name: "Завдання №1",
	    work: "Дипломна робота"
	}
  });

  return TaskModel;

});