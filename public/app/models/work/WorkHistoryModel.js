define([
  'underscore',
  'backbone'
], function(_, Backbone) {
	var WorkHistoryModel = Backbone.Model.extend({
	    defaults: {
			auditable_type: "Work"
		}
  	});

  return WorkHistoryModel;

});