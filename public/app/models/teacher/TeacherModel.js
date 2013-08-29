define([
    'underscore',
    'backbone'
], function(_, Backbone) {

    var TeacherModel = Backbone.Model.extend({
        defaults:{
            id: null,
            name: 'default',
            middle_name: 'unknown',
            last_name: 'unknown',
            email: 'unknown',
            degree: 'unknown',
            department: 0,
            title: 'unknown'
        }
    });

    return TeacherModel;

});