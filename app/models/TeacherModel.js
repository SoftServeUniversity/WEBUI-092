define([
    'underscore',
    'backbone'
], function(_, Backbone) {

    var TeacherModel = Backbone.Model.extend({
        defaults:{
            name: null,
            percentage: 0
        }
    });

    return TeacherModel;

});