define([
  'jquery',
  'underscore',
  'backbone',
  'models/admin/FaAdminModel',
], function($, _, Backbone, FaAdminModel){

 var FaAdminsCollection = Backbone.Collection.extend({
    model: FaAdminModel,
    url: "app/mocks/admin/facultyAdmins.json"
  });
  return FaAdminsCollection;

});
