define([
	'jquery',
	'underscore',
	'backbone',
	'models/task/TaskModel'
	], function($, _, Backbone, TaskModel){
		var TasksCollection =  Backbone.Collection.extend({
			url: "/tasks/",
			model: TaskModel
		});
		return TasksCollection;
	});
