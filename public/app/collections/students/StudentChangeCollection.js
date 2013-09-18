define([
    'jquery',
    'underscore',
    'backbone',
    'models/student/StudentChangeModel'
], function($, _, Backbone, StudentChangeModel){

    var StudentChangeCollection = Backbone.Collection.extend({
        model : StudentChangeModel,
        url: "/progress_changes.json"
    });

    return StudentChangeCollection;

});
