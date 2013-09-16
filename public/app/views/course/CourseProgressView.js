define([
    'jquery',
    'underscore',
    'backbone',
    'text!templates/shared/StTemplate.html',
    'views/shared/ListView',
    'views/shared/ChartView',
    'collections/groups/GroupsCollection',
    'collections/courses/CoursesCollection',
    'collections/courses/CourseChangeCollection'



],
    function($, _, Backbone, StTemplate, ListView, ChartView, GroupsCollection, CoursesCollection,CourseChangeCollection){

        var CourseProgressView =  Backbone.View.extend({
            loadData: function(id){
                courseId = id;
                var me = this;

                groups_col = new GroupsCollection();
                groups_col.fetch({
                    data: {
                        filter: {
                            course_id:id
                        }
                    },
                    success:function () {
                        me.trigger('DataLoaded', 'Groups');
                    }
                });

                courses_col = new CoursesCollection();
                courses_col.fetch({

                    success: function () {
                        me.trigger('DataLoaded', 'Courses');
                    }
                });

                courses_change_col = new CourseChangeCollection();
                courses_change_col.fetch({
                    data: {
                        filter: {
                            progressable_id:id,
                            progressable_type:'Course'
                        }
                    },
                    success:function () {
                        me.trigger('DataLoaded', 'CoursesChange');
                    }
                });

            },

            initialize:function(){
                var isGroupsLoaded = false;
                var isCoursesLoaded = false;
                var isCoursesChangeLoaded = false;

                var me = this;

                this.on('DataLoaded', function (item) {
                    if (item == 'Groups'){
                        isGroupsLoaded = true;
                    }
                    if (item == 'Courses') {
                        isCoursesLoaded = true;
                    }
                    if (item == 'CoursesChange'){
                        isCoursesChangeLoaded = true;
                    }
                    if (isGroupsLoaded && isCoursesLoaded && isCoursesChangeLoaded){
                        me.render();
                    }
                });

            },

            render:function(){
                var course_name = courses_col.get(courseId).toJSON().name;


                var groupsListView = new ListView({
                    collection:groups_col,
                    linkTo:"group"
                });

                var chartView = new ChartView({
                    collection:courses_change_col
                });
                var data = {
                    name:course_name,
                    listTitle: "Список груп",
                    list : groupsListView.render().$el.html()

                }

                var compiledTemplate = _.template( StTemplate, data);
                $("#content").html(compiledTemplate);
                chartView.render();
                return this;
            }
        });
        return CourseProgressView;
    });




