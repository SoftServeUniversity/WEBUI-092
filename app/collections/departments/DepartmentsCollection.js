define([
    'jquery',
    'underscore',
    'backbone',
    'models/department/DepartmentModel'
], function($, _, Backbone, DepartmentModel){

    return Backbone.Collection.extend({
        model:DepartmentModel
    });

});
