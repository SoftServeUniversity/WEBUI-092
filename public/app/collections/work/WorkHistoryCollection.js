define([
  'jquery',
  'underscore',
  'backbone',
  'models/work/WorkHistoryModel'
], function($, _, Backbone, WorkHistoryModel){
	
  var WorkHistoryCollection = Backbone.Collection.extend({
  	model: WorkHistoryModel,
    url: '/thesis_changes/'

  });
  
  return WorkHistoryCollection;
});
