define([
    'underscore',
    'backbone',
    'marionettes/user/init'
], function(_, Backbone, BD) {
  BD.Models.UserPasswordRecovery = Backbone.Model.extend({
    url: '/users/password.json',
    paramRoot: 'user',

    defaults: {
      "email": ""
    }
  });

  return BD.Models.UserPasswordRecovery;
});
