define([
	'jquery',
	'underscore',
	'backbone',
	'models/task/TaskModel'
	], function($, _, Backbone, TaskModel){
		var TasksCollection =  Backbone.Collection.extend({
			'url': '/tasks/1.json', // http://localhost:3000/tasks.json
			model: TaskModel
		});
		return TasksCollection;
	});