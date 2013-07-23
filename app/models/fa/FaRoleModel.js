define([
  'underscore',
  'backbone'
], function(_, Backbone) {
  
  var FaRoleModel = Backbone.Model.extend({
    defaults: {
      role_name: '',
      user_name: ''
    }
  });

  return FaRoleModel;

});