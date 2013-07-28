define([
    'jquery',
    'underscore',
    'backbone',
    'views/shared/ElementView'
], function($, _, Backbone, ElementView){

    var ListView = Backbone.View.extend({
        collection : null,
        tagName: 'div',
        initialize: function (){
        },
        render:function(){
            // counter -  is used for mark each element in a table
            // linkTo - is used for creating <a> links if it is needed
                var counter = 1;
                this.collection.each(function(element) {
                var elementView = new ElementView({model: element, linkTo: this.options.linkTo});
                this.$el.append(elementView.render(counter++).el);
            }, this);

            return this;
        }

    });
    return  ListView;
});

