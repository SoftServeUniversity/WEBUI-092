define([
    'jquery',
    'underscore',
    'backbone',
    'models/department/DepartmentChangeModel'
], function($, _, Backbone, DepartmentChangeModel){
    
    var DepartmentChangeCollection = Backbone.Collection.extend({
        model : DepartmentChangeModel,
        url: "/progress_changes.json"
    });

    return DepartmentChangeCollection;

});