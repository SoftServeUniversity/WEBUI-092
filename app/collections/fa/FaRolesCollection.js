define([
  'jquery',
  'underscore',
  'backbone',
  'models/fa/FaRole'
], function($, _, Backbone, FaRole){
  
  var FaRolesCollection = function(){
    model:FaRoleModel
  }
  return FaRolesCollection;
});
