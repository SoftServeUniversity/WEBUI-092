define([
    'underscore',
    'backbone'
], function(_, Backbone) {

    var InfoModel = Backbone.Model.extend({
      defaults: {
      	content: 'page content empty'
      },
      urlRoot: '/info/'
    });

    return InfoModel;
});