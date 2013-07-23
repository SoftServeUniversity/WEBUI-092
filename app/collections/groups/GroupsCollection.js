define([
    'jquery',
    'underscore',
    'backbone',
    'models/groups/GroupModel'
], function($, _, Backbone, GroupModel){

    var GroupsCollection = Backbone.Collection.extend({
        model:GroupModel,
        url: "app/mocks/groups.json"
    });

    return GroupsCollection;

});
