define([
    'jquery',
    'underscore',
    'backbone',
    'models/teacher/TeacherChangeModel'
], function($, _, Backbone, TeacherChangeModel){

    var TeacherChangeCollection = Backbone.Collection.extend({
        model : TeacherChangeModel,
        url: "/progress_changes.json"
    });

    return TeacherChangeCollection;

});