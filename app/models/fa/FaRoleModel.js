define([
  'underscore',
  'backbone'
], function(_, Backbone) {
  
  var FaRoleModel = Backbone.Model.extend({
    defaults: {
      name: null
    }
  });

  return FaRoleModel;

});