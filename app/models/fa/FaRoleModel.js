define([
  'underscore',
  'backbone'
], function(_, Backbone) {
  
  var FaRoleModel = Backbone.Model.extend({
    defaults: {
      name: '',
      user_name: ''
    }
  });

  return FaRoleModel;

});