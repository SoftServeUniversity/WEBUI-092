//I need this for users
define([
    'jquery',
    'underscore',
    'backbone',
    'models/group/TemporaryGroupModel'
], function($, _, Backbone, TemporaryGroupModel){
    
    return Backbone.Collection.extend({
        model : TemporaryGroupModel,
        url: 'groups'
    });

});