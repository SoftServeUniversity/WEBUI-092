define([
    'jquery',
    'underscore',
    'backbone',
    'models/student/StudentChangeModel'
], function($, _, Backbone, StudentChangeModel){

    var StudentChangeCollection = Backbone.Collection.extend({
        model : StudentChangeModel,
        url: "app/mocks/studentChange.json"
    });

    return StudentChangeCollection;

});
