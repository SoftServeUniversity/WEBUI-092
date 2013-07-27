define([
    'jquery',
    'underscore',
    'backbone',
    'models/department/DepartmentChangeModel'
], function($, _, Backbone, DepartmentChangeModel){
    
    var DepartmentChangeCollection = Backbone.Collection.extend({
        model : DepartmentChangeModel,
        url: "app/mocks/departmentChange.json"
    });

    return DepartmentChangeCollection;

});