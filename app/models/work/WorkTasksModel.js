define([
  'underscore',
  'backbone'
], function(_, Backbone) {

	defaults: {
		"name": "Task Name", 
    "id": "001", 
    "percentage": "30",
    "workname": ""
	}
  
  var WorkTasksModel = Backbone.Model.extend({});

  return WorkTasksModel;

});