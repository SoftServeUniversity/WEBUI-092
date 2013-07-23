define([
    'jquery',
    'underscore',
    'backbone',
    'models/courses/CourseModel'
], function($, _, Backbone, CourseModel){

    var CoursesCollection = Backbone.Collection.extend({
        model:CourseModel,
        url: "app/mocks/courses.json"
    });

    return CoursesCollection;

});
