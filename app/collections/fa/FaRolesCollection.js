define([
  'jquery',
  'underscore',
  'backbone',
<<<<<<< HEAD
  'localstorage',
  'models/fa/FaRoleModel',
], function($, _, Backbone, Store, FaRoleModel){
  var FaRolesCollection = Backbone.Collection.extend({
    model: FaRoleModel,
    localstorage: new Store('backbone-fa-roles'),
=======
  'models/fa/FaRoleModel'
], function($, _, Backbone, FaRoleModel){
  
  var FaRolesCollection = Backbone.Collection.extend({
    model: FaRoleModel
>>>>>>> old-state
  });
  return FaRolesCollection;
});
