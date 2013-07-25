define([
  'underscore',
  'backbone'
], function(_, Backbone) {
  
  var FaRoleModel = Backbone.Model.extend({
    defaults:{
      id: null,
      name: null,
      email: null,
      role: null
    }
  });

  return FaRoleModel;

});