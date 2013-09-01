define([
    'underscore',
    'backbone',
    'marionettes/user/init'
], function(_, Backbone, BD) {
  return Backbone.Model.extend({
    url: '/users/edit.json'
  });
});
