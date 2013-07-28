define([
    'jquery',
    'underscore',
    'backbone',
    'text!templates/fa/dbManagementTemplate.html'
], function($, _, Backbone, dbManagementTemplate){

    var DBView = Backbone.View.extend({
        el: $('#content'),
        render: function (){
            var that = this;

            var compiledTemplate = _.template( dbManagementTemplate);

            this.$el.html(compiledTemplate);
        }
    });
    return  DBView;
});