define([
  'underscore',
  'backbone'
], function(_, Backbone) {

  var WorkModel = Backbone.Model.extend({
    urlRoot: "/works/"
  });

  return WorkModel;

});