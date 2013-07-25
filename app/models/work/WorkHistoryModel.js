define([
  'underscore',
  'backbone'
], function(_, Backbone) {
	var WorkHistoryModel = Backbone.Model.extend({
	    defaults: {
			"id": 1,
			"parent_id": 0,
		    "username": "student", 
		    "item": "changed smth"
		}
  	});

  return WorkHistoryModel;

});