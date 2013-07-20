define([
    'underscore',
    'backbone'
], function(_, Backbone) {

    var GroupModel = Backbone.Model.extend({
        defaults:{
            name: null,
            percentage: 0
        }
    });

    return GroupModel;

});

