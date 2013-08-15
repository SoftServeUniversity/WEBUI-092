define([
	'underscore',
	'backbone'
	], function(_, Backbone) {

		var TaskModel = Backbone.Model.extend({
			defaults: {
				"id": Math.round(Math.random()*10e10),
				"name": "",
				"process": 0,
				"thesis": 0
			},
			validate: function (attrs) {
				if (attrs.name.length > 250) {
					return "Name is to long";
				}
				if (!attrs.name) {
					return "You should have a name";
				}
				if (attrs.process < 10 && attrs.process > 100) {
					return "Process of task must be in range 0-100";
				}
				if (!attrs.thesis) {
					return "Task must have a thesis";
				}
			}
		});

		return TaskModel;

	});