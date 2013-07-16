define([
    'jquery',
    'underscore',
    'backbone',
    'collections/CoursesCollection',
    'views/department/CourseView'

], function($, _, Backbone, CoursesCollection, CourseView){

    var CoursesListView = Backbone.View.extend({
        collection : new CoursesCollection(courseJSON),
        tagName: 'ul',
        initialize: function (){
        },
        render:function(){
            this.collection.fetch({
                url: "app/mocks/courses.json",
                async:false
            });
            this.collection.each(function(course) {
                var courseView = new CourseView({model: course});
                this.$el.append(courseView.render().el);
            }, this);

            return this;
        }

    });
    return CoursesListView;
});

