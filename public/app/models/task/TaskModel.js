define([
  'underscore',
  'backbone'
], function(_, Backbone) {
  
  var TaskModel = Backbone.Model.extend({
	urlRoot: "http://localhost:3000/tasks"
	// defaults: {
	//     "id": Math.round(Math.random()*10e10),
	//     "name": "Завдання №1",
	//     "process": 36,
	//     "thesis": "Дипломна робота"
	// }

  });

  return TaskModel;

});