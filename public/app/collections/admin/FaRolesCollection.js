define([
  'jquery',
  'underscore',
  'backbone',
  'models/admin/FaRoleModel',
], function($, _, Backbone, FaRoleModel){

 var FaRolesCollection = Backbone.Collection.extend({
    model: FaRoleModel,
    url: "app/mocks/admin/roles.json"
  });
  return FaRolesCollection;

});
