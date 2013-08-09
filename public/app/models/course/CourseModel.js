define([
    'underscore',
    'backbone'
], function(_, Backbone) {

    var CourseModel = Backbone.Model.extend({
        url: "http://localhost:3000/courses.json",
        defaults:{
            id: null,
            name: null,
            year_of_start: null,
            faculty: null,
            percentage: 0
        }
    });

    return CourseModel;

});
