define([
    'jquery',
    'underscore',
    'backbone',
    'models/CourseModel'
], function($, _, Backbone, CourseModel){

    var CoursesCollection = Backbone.Collection.extend({
        model:CourseModel
    });

    return CoursesCollection;

});
