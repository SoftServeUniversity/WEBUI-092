define([
  'underscore',
  'backbone'
], function(_, Backbone) {
      var WorkModel = Backbone.Model.extend({
        url: '/works/',
        defaults: {
            id: 0,
            name: "",
            progress: 0,
            student: 1
        }
    });

    return WorkModel;
});