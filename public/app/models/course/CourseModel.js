define([
    'underscore',
    'backbone'
], function(_, Backbone) {

    var CourseModel = Backbone.Model.extend({
        defaults:{
            id: null,
            name: null,
            year_of_start: null,
            faculty: null,
            percentage: 0
        },
        urlRoot: 'courses/'

    });

    return CourseModel;

});
