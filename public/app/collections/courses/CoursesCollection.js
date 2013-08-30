define([
    'jquery',
    'underscore',
    'backbone',
    'models/course/CourseModel'
], function($, _, Backbone, CourseModel){

    var CoursesCollection = Backbone.Collection.extend({
        model:CourseModel,
        //url: "app/mocks/courses.json"
        //for datbase use this url
        url: "/courses/"
    });


    return CoursesCollection;

});
