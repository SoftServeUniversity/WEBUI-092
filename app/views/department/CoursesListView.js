define([
    'jquery',
    'underscore',
    'backbone',
    'collections/departments/CoursesCollection',
    'views/department/CourseView'

], function($, _, Backbone, CoursesCollection, CourseView){
    var courseJSON = [
        {
            name: '5 курс',
            percentage: 75
        },
        {
            name: '3 курс',
            percentage: 50
        },
        {
            name: '4 курс',
            percentage:80
        }
    ];
    var CoursesListView = Backbone.View.extend({
        collection : new CoursesCollection(courseJSON),
        tagName: 'ul',
        initialize: function (){
        },
        render:function(){
            this.collection.each(function(course) {
                var courseView = new CourseView({model: course});
                this.$el.append(courseView.render().el);
            }, this);

            return this;
        }

    });
    return CoursesListView;
});

