define([
    'underscore',
    'backbone',
    'marionettes/user/init'
], function(_, Backbone, BD) {
  BD.Models.UserRegistration = Backbone.Model.extend({
    url: '/users.json',
    paramRoot: 'user',

    defaults: {
      "email": "",
      "password": "",
      "password_confirmation": ""
    }
  });
  return BD.Models.UserRegistration;
});
