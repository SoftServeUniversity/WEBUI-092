define([
	'jquery',
	'underscore',
	'backbone',
	'models/task/commentModel'
	], function($, _, Backbone, commentModel){

		var CommentsCollection = Backbone.Collection.extend({
			'url': 'app/collections/tasks/commentsCollection.json',
			model: commentModel
		});

		return CommentsCollection;
	});
