define([
    'jquery',
    'underscore',
    'backbone',
    'models/course/CourseChangeModel'
], function($, _, Backbone, CourseChangeModel){
    
    var CourseChangeCollection = Backbone.Collection.extend({
        model : CourseChangeModel,
        url: "/progress_changes.json"
    });

    return CourseChangeCollection;

});