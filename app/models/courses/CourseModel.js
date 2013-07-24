define([
    'underscore',
    'backbone'
], function(_, Backbone) {

    var CourseModel = Backbone.Model.extend({

        defaults:{
            id: null,
            name: null,
            percentage: 0
        }
    });

    return CourseModel;

});
