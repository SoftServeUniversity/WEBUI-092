define([
    'jquery',
    'underscore',
    'backbone',
    'models/department/DepartmentModel'
], function($, _, Backbone, DepartmentModel){

    var DepartmentsCollection = Backbone.Collection.extend({
        model:DepartmentModel
    });

    return DepartmentsCollection;

});