define([
  'jquery',
  'underscore',
  'backbone',
  'models/work/WorkModel'
], function($, _, Backbone, WorkModel){
  
  var WorkCollection = Backbone.Collection.extend({
    model: WorkModel,
    //url: 'http://localhost:3000/works.json'
      url: "/works/"

  });
  
  return WorkCollection;

});
