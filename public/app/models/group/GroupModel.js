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
            progress: 20
            //percentage: 20
        },
        urlRoot: '/groups/'
    });

    return GroupModel;

});

