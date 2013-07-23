define([
    'underscore',
    'backbone'
], function(_, Backbone) {

    var TeacherModel = Backbone.Model.extend({
        defaults:{
            id: null,
            name: null,
            percentage: 0
        }
    });

    return TeacherModel;

});