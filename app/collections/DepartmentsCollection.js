define([
    'jquery',
    'underscore',
    'backbone',
    'models/DepartmentModel'
], function($, _, Backbone, DepartmentModel){

    var DepartmentsCollection = Backbone.Collection.extend({
        model:DepartmentModel
    });

    return DepartmentsCollection;

});