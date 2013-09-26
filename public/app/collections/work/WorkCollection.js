define([
  'jquery',
  'underscore',
  'backbone',
  'models/work/WorkModel'

], function($, _, Backbone, WorkModel){

  var WorkCollection = Backbone.Collection.extend({
    model: WorkModel,
    url: '/works/'
  });

  return WorkCollection;

});
