define([
	'jquery',
	'underscore',
	'backbone',
	'models/task/taskModel'
	], function($, _, Backbone, taskModel){
		var TasksCollection =  Backbone.Collection.extend({
			'url': 'http://localhost:3000/tasks.json',
			model: taskModel
		});
		return TasksCollection;
	});
