define([
    'underscore',
    'backbone'
], function(_, Backbone) {

    var GroupModel = Backbone.Model.extend({
        defaults:{
            id: null,
            name: null,
            course: null,
            department: null,
            teacher: null,
            percentage: 20
        }
    });

    return GroupModel;

});

