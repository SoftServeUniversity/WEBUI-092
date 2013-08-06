define([
    'underscore',
    'backbone'
], function(_, Backbone) {

    var GroupModel = Backbone.Model.extend({
        defaults:{
            id: null,
            name: null,
            number_of_students: null,
            course: null,
            department: null,
            teacher: null,
            percentage: 0
        }
    });

    return GroupModel;

});

