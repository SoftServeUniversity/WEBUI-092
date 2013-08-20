define([
    'underscore',
    'backbone'
], function(_, Backbone) {
  return Backbone.Model.extend({
    url: '/users/sign_out.json'
  });
});