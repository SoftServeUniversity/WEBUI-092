define([
  'jquery',
  'underscore',
  'backbone',
  'models/work/WorkHistoryModel'
], function($, _, Backbone, WorkHistoryModel){

  var WorkHistoryCollection = Backbone.Collection.extend({
    model: WorkHistoryModel,
    url: 'app/mocks/work/historymodal.json',
      comparator: function(m) {
          return  new Date(m.get('created_at')).getTime();
      }

  });
  
  return WorkHistoryCollection;
});
