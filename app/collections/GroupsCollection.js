define([
    'jquery',
    'underscore',
    'backbone',
    'models/GroupModel'
], function($, _, Backbone, GroupModel){

    var GroupsCollection = Backbone.Collection.extend({
        model:GroupModel
    });

    return GroupsCollection;

});
