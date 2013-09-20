define([
  'jquery',
  'underscore',
  'backbone'
], function($, _, Backbone){

  var UsersCollection = Backbone.Collection.extend({
    url: "/users/"
  });

  return UsersCollection;
});