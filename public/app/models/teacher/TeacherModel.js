define([
    'underscore',
    'backbone'
], function(_, Backbone) {

    var TeacherModel = Backbone.Model.extend({
        defaults:{
        },
        urlRoot: '/teachers/'
    });

    return TeacherModel;

});