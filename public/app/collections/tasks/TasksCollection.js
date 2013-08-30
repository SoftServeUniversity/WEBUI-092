define([
	'jquery',
	'underscore',
	'backbone',
	'models/task/TaskModel'
	], function($, _, Backbone, TaskModel){
		var TasksCollection =  Backbone.Collection.extend({
<<<<<<< HEAD
			//url: 'http://localhost:3000/app/collections/tasks/taskCollectionJson.json',
			url: "/tasks/",
=======
			'url': 'http://localhost:3000/tasks/1.json', // http://localhost:3000/tasks.json
>>>>>>> 3c1a6d85f0b0d4c17cd5fb29dfc2503a05f7ab64
			model: TaskModel
		});
		return TasksCollection;
	});
