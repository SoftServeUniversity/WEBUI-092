define([
    'underscore',
    'backbone'
], function(_, Backbone) {

    var DepartmentModel = Backbone.Model.extend({
        defaults:{
        },
        urlRoot: '/departments/'
    });

    return DepartmentModel;

});
