define([
    'jquery',
    'underscore',
    'backbone',
    'models/department/TemporaryDepartmentModel'
], function($, _, Backbone, TemporaryDepartmentModel){
    
    return Backbone.Collection.extend({
        model : TemporaryDepartmentModel,
        url: 'departments'
    });

});