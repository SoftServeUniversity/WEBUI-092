define([
    'underscore',
    'backbone'
], function(_, Backbone) {

    var WorkModel = Backbone.Model.extend({
        url: 'app/mocks/work/work.json',
        defaults: {
            "id": 0,
            "name": "",
            "progress": "0"
        }
    });

    return WorkModel;

});