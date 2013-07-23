define([
  'underscore',
  'backbone'
], function(_, Backbone) {
<<<<<<< HEAD

	defaults: {
		"name": "Назва завдання", 
    "id": "001", 
    "percentage": "30",
    "workname": ""
	}
  
  var WorkTasksModel = Backbone.Model.extend({});

  return WorkTasksModel;
=======
  var WorkTasksModel = Backbone.Model.extend({
    defaults: {
      "name": "Завдання", 
      "id": "001", 
      "percentage": "30",
      "workname": ""
    }
  });	
>>>>>>> snazatc

});