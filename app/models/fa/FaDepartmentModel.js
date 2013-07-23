define([
  'underscore',
  'backbone'
], function(_, Backbone) {
  
  var FaRoleModel = Backbone.Model.extend({
    defaults:{
      id: null,
      name: null,
      head: null,
      faculty: null
    }
  });

  return FaRoleModel;

});