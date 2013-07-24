define([
  'jquery',
  'underscore',
  'backbone',
  'models/fa/FaDepartmentModel',
], function($, _, Backbone, FaDepartmentModel){
  var FaDepartmentsCollection = Backbone.Collection.extend({
    model: FaDepartmentModel
  });
  return FaDepartmentsCollection;
});
