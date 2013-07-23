define([
    'underscore',
    'backbone'
], function(_, Backbone) {

    var DepartmentModel = Backbone.Model.extend({
        defaults:{
            id: null,
            name: null,
            head_of_department: null,
            faculty: null,
            percentage: 0
        }
    });

    return DepartmentModel;

});
