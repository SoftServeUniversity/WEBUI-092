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
            percentage: 25 //external
        },
        //urlRoot: 'courses/'

    });

    return CourseModel;

});
