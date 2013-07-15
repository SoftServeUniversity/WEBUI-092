define([
    'jquery',
    'underscore',
    'backbone',
    'text!templates/department/courseTemplate.html',
    'collections/departments/CoursesCollection'
], function($, _, Backbone, courseTemplate, CoursesCollection){

    var CourseView =  Backbone.View.extend({
        tagName:'li' ,
        template: _.template(courseTemplate),

        initialize:function(){
            this.render();
        } ,
        render:function(){
            this.$el.html(this.template(this.model.toJSON()));
            return this;
        }
    });
    return CourseView;
});


