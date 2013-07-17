define([
  'underscore',
  'backbone'
], function(_, Backbone) {

	defaults: {
		"name": "Назва завдання", 
      	"id": "001", 
      	"percentage": "30"
      	"workname": ""
	}
  
  var WorkTasksModel = Backbone.Model.extend({});

  return WorkTasksModel;

});