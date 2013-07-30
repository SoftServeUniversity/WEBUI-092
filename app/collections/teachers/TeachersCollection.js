define([
    'jquery',
    'underscore',
    'backbone',
    'models/teacher/TeacherModel'
], function($, _, Backbone, TeacherModel){

    var TeachersCollection = Backbone.Collection.extend({
        model:TeacherModel,
        url: "app/mocks/teachers.json"
    });

    return TeachersCollection;

});
