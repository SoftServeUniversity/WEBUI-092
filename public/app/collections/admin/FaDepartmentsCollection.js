define([
  'jquery',
  'underscore',
  'backbone',
  'models/admin/FaDepartmentModel',
], function($, _, Backbone, FaDepartmentModel){
  var FaDepartmentsCollection = Backbone.Collection.extend({
    model: FaDepartmentModel,
    url: "app/mocks/admin/departments.json"
  });
  return FaDepartmentsCollection;
});
