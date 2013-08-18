define([
    'underscore',
    'backbone'
], function(_, Backbone) {

    var TeacherModel = Backbone.Model.extend({
        defaults:{
            id: null,
            name: 'Мокренко А.Б.',
            degree: 0,
            userRef: 0,
            departmentRef: 0
        }
    });

    return TeacherModel;

});