define([
    'underscore',
    'backbone'
], function(_, Backbone) {
  return  Backbone.Model.extend({
    url: '/users/sign_in.json',
    paramRoot: 'user',

    defaults: {
      "email": "",
      "password": ""
    }

  });
});
