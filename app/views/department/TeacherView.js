define([
    'jquery',
    'underscore',
    'backbone',
    'text!templates/department/TeacherTemplate.html'
], function($, _, Backbone, TeacherTemplate){

    var TeacherView =  Backbone.View.extend({
        tagName:'li' ,
        template: _.template(TeacherTemplate),

        initialize:function(){
            this.render();
        } ,
        render:function(){
            this.$el.html(this.template(this.model.toJSON()));
            return this;
        }
    });
    return TeacherView;

});
