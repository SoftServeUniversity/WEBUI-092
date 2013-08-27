define([
	'jquery',
	'underscore',
	'backbone',
	'models/task/ProgressModel'
	], function($, _, Backbone, ProgressModel){

		var ProgressesCollection = Backbone.Collection.extend({
			model: ProgressModel
		});

		return ProgressesCollection;
	});
