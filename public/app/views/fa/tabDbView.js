define([
    'jquery',
    'underscore',
    'backbone',
    'text!templates/fa/tabDBTemplate.html'
], function($, _, Backbone, TabDBTemplate){

    var DBView = Backbone.View.extend({
        el: $('#content'),
        render: function (){
            var that = this;

            var compiledTemplate = _.template( TabDBTemplate);

            this.$el.html(compiledTemplate);
        },

        events: {
        "click #submit" : "imgLoader"
        },
        imgLoader: function(){
            $('#imgLoader').show();
        }
    });


    return  DBView;
});