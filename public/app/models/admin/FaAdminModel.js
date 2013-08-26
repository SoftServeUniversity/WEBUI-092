define([
  'underscore',
  'backbone'
], function(_, Backbone) {
  
  var FaAdminModel = Backbone.Model.extend({
    defaults:{
      id: null,
      name: null,
      lastName: null,
      middleName: null,
      email: null
    }
  });

  return FaAdminModel;

});