define([
	'jquery',
	'underscore',
	'backbone',
	'models/task/taskModel'
	], function($, _, Backbone, taskModel){
		var tasksCollection =  Backbone.Collection.extend({
			'url': 'app/collections/task/taskCollectionJson.json',
			model: taskModel
		});
		return tasksCollection;
	});
