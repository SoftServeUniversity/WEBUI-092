define([
    'jquery',
    'underscore',
    'backbone',
    'text!templates/department/GroupTemplate.html'
], function($, _, Backbone, GroupTemplate){

    var GroupView =  Backbone.View.extend({
        tagName:'li' ,
        template: _.template(GroupTemplate),

        initialize:function(){
            this.render();
        } ,
        render:function(){
            this.$el.html(this.template(this.model.toJSON()));
            return this;
        }
    });
    return GroupView;

});