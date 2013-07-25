define([
  'jquery',
  'underscore',
  'backbone',
  'models/faculties/FacultyChangeModel'
], function($, _, Backbone, FacultyChangeModel){

	var FacultyChangeCollection = Backbone.Collection.extend({
		model: FacultyChangeModel,
		url: "app/mocks/facultyChange.json"
	});
	  
	return FacultyChangeCollection;
});
