define([
    'jquery',
    'underscore',
    'backbone',
    'models/TeacherModel'
], function($, _, Backbone, TeacherModel){

    var TeachersCollection = Backbone.Collection.extend({
        model:TeacherModel
    });

    return TeachersCollection;

});
