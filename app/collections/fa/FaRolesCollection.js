define([
  'jquery',
  'underscore',
  'backbone',
  'localstorage',
  'models/fa/FaRoleModel',
], function($, _, Backbone, Store, FaRoleModel){
  var FaRolesCollection = Backbone.Collection.extend({
    model: FaRoleModel,
    localstorage: new Store('backbone-fa-roles')
  });
  return FaRolesCollection;
});
