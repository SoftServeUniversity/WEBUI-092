//need this for user registration
define([
    'underscore',
    'backbone'
], function(_, Backbone) {

    return Backbone.Model.extend({
        urlRoot: 'groups/'
    });

});
