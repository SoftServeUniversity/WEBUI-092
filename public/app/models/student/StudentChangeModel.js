define([
    'underscore',
    'backbone'
], function(_, Backbone) {

    var StudentChangeModel = Backbone.Model.extend({
        defaults:{
            progress: 1,
            change_time: '2013-06-17 13:12:01'
        }
    });

    return StudentChangeModel;

});
