define([
    'underscore',
    'backbone'
], function(_, Backbone) {

    var DepartmentModel = Backbone.Model.extend({
        defaults:{
            name: null,
            percentage: 0
        }
    });

    return DepartmentModel;

});
