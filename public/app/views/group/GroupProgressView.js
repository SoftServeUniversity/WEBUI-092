define([
    'jquery',
    'underscore',
    'backbone',
    'text!templates/shared/GroupProgressTemplate.html',
    'collections/students/StudentsCollection',
    'views/shared/ListView',
    'views/shared/ChartView',
    'collections/groups/GroupsCollection',
    'collections/groups/GroupChangeCollection'



],
    function($, _, Backbone, GroupProgressTemplate, StudentsCollection, ListView, ChartView, GroupsCollection, GroupChangeCollection){

        var GroupProgressView =  Backbone.View.extend({
            loadData: function(id){
                groupId = id;
                var me = this;

                groups_col = new GroupsCollection();
                groups_col.fetch({
                    success:function () {
                        me.trigger('DataLoaded', 'Groups');
                    }
                });

                students_col = new StudentsCollection();
                students_col.fetch({
                    data: {
                        filter: {
                            group_id:id
                        }
                    },
                    success: function () {
                        me.trigger('DataLoaded', 'Students');
                    }
                });

                groups_change_col = new GroupChangeCollection();
                groups_change_col.fetch({
                    data: {
                        filter: {
                            progressable_id:id,
                            progressable_type:'Group'
                        }
                    },
                    success:function () {
                        me.trigger('DataLoaded', 'GroupsChange');
                    }
                });


            },

            initialize:function(){
                var isGroupsLoaded = false;
                var isStudentsLoaded = false;
                var isGroupsChangeLoaded = false;

                var me = this;

                this.on('DataLoaded', function (item) {
                    if (item == 'Groups'){
                        isGroupsLoaded = true;
                    }
                    if (item == 'Students') {
                        isStudentsLoaded = true;
                    }
                    if (item == 'GroupsChange'){
                        isGroupsChangeLoaded = true;
                    }
                    if (isGroupsLoaded && isStudentsLoaded && isGroupsChangeLoaded){
                        me.render();
                    }
                });

            },

            render:function(){
                var group = groups_col.get(groupId).toJSON();

                var studentsListView = new ListView({
                    collection:students_col,
                    linkTo:"student"
                });

                var chartView = new ChartView({
                    collection:groups_change_col
                });
                var data = {
                    group:group,
                    //subheader_1: 'Факультет',
                    //subheader_2: 'Курс',
                    //subheader_3: 'Куратор',
                    listTitle: "Список студентів",
                    list : studentsListView.render().$el.html()

                }

                var compiledTemplate = _.template( GroupProgressTemplate, data);
                $("#content").html(compiledTemplate);
                chartView.render();
                return this;
            }
        });
        return GroupProgressView;
    });

