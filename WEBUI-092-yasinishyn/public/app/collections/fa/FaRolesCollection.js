define([
  'jquery',
  'underscore',
  'backbone',
  'models/fa/FaRoleModel',
], function($, _, Backbone, FaRoleModel){

 var FaRolesCollection = Backbone.Collection.extend({
    model: FaRoleModel,
    url: "app/mocks/fa/roles.json"
  });
  return FaRolesCollection;

});
