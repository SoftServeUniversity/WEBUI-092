define([
	'jquery',
	'underscore',
	'backbone',
	'models/task/TaskModel'
	], function($, _, Backbone, TaskModel){
		var TasksCollection =  Backbone.Collection.extend({
			//url: 'http://localhost:3000/app/collections/tasks/taskCollectionJson.json',
			url: "/tasks/",
			model: TaskModel
		});
		return TasksCollection;
	});
