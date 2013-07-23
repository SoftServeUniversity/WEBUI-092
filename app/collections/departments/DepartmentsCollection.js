define([
    'jquery',
    'underscore',
    'backbone',
    'models/departments/DepartmentModel'
], function($, _, Backbone, DepartmentModel){

    var DepartmentsCollection = Backbone.Collection.extend({
        model:DepartmentModel ,
        url: "app/mocks/departments.json"
    });

    return DepartmentsCollection;

});