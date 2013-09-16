define([
    'jquery',
    'underscore',
    'backbone',
    'models/group/GroupChangeModel'
], function($, _, Backbone, GroupChangeModel){
    
    var GroupChangeCollection = Backbone.Collection.extend({
        model : GroupChangeModel,
        url: "/progress_changes.json"
    });

    return GroupChangeCollection;

});