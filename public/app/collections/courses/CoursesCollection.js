define([
    'jquery',
    'underscore',
    'backbone',
    'models/course/CourseModel'
], function($, _, Backbone, CourseModel){

    var CoursesCollection = Backbone.Collection.extend({
        model:CourseModel,
        url: "http://localhost:3000/courses.json"
    });


    return CoursesCollection;

});
