define([
  'jquery',
  'underscore',
  'backbone',
  'localstorage',
  'models/fa/FaRoleModel'
], function($, _, Backbone, FaRoleModel){
  
  var FaRolesCollection = function(){
    model:FaRoleModel
  }
  return FaRolesCollection;
});
