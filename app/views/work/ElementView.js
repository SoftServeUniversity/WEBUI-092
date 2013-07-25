define([
    'jquery',
    'underscore',
    'backbone',
    'text!templates/work/elementTemplate.html'
], function($, _, Backbone, elementTemplate){

    var ElementView =  Backbone.View.extend({
        tagName:'div' ,
        template: _.template(elementTemplate),
        linkTo: null,

        initialize:function(){
            this.render();
        } ,
        render:function(counter){
            // counter -  is used for mark each element in a table
            // linkTo - is used for creating <a> links if it is needed
            this.model.set('counter', counter);
            this.model.set('linkTo', this.options.linkTo);
            this.$el.html(this.template(this.model.toJSON()));
            return this;
        }
    });
    
    return ElementView;

});
