define([
    'jquery',
    'underscore',
    'backbone',
    'collections/groups/GroupsCollection',
    'collections/teachers/TeachersCollection',
    'views/shared/ListView',
    'views/shared/ChartView',
    'text!templates/shared/MainTemplate.html',
    'collections/departments/DepartmentsCollection',
    'collections/departments/DepartmentChangeCollection',



], function($, _, Backbone, GroupsCollection, TeachersCollection, ListView, ChartView, MainTemplate, DepartmentsCollection, DepartmentChangeCollection){

    var MainDepartmentView =  Backbone.View.extend({
        loadData: function(id){
          depId = id;
            var me = this;

            deps_col = new DepartmentsCollection();
            deps_col.fetch({
                success: function () {
                   me.trigger('DataLoaded', 'Deps');
                }
            });

            groups_col = new GroupsCollection();
            groups_col.fetch({
                data: {
                    filter: {
                        department_id:id
                    }
                },
                success:function () {
                    me.trigger('DataLoaded', 'Groups');
                }
            });

            teachers_col = new TeachersCollection();
            teachers_col.fetch({
                data: {
                    filter: {
                        department_id:id
                    }
                },
               success:function () {
                    me.trigger('DataLoaded', 'Teachers');
                }
            });

            dep_change_col = new DepartmentChangeCollection();
            dep_change_col.fetch({
                    data: {
                        filter: {
                            progressable_id:id,
                            progressable_type:'Department'
                        }
                    },
                success:function () {
                    me.trigger('DataLoaded', 'DepChange');
                }
            });

         },

        initialize:function(){
            var isDepLoaded = false;
            var isGroupsLoaded = false;
            var isTeachersLoaded = false;
            var isDepChangeLoaded = false;

            var me = this;

            this.on('DataLoaded', function (item) {
                if (item == 'Deps') {
                    isDepLoaded = true;
                }
                if (item == 'Groups'){
                    isGroupsLoaded = true;
                }
                if (item == 'Teachers'){
                    isTeachersLoaded = true;
                }
                if (item == 'DepChange'){
                    isDepChangeLoaded = true;
                }
                if (isDepLoaded && isGroupsLoaded && isTeachersLoaded && isDepChangeLoaded){
                    me.render();
                }
            });

         },

         render:function(){
            var dep_name = deps_col.get(depId).toJSON().name;


             var groupsListView = new ListView({
                 collection:groups_col,
                 linkTo:"group"
             });

             var teachersListView = new ListView({
                 collection:teachers_col,
                 linkTo:"teacher"
             });

              var chartView = new ChartView({
                collection:dep_change_col
            });
            var data = {
                name: dep_name,
                firstListTitle: "Список груп",
                secondListTitle: "Список наукових керівників",
                firstList : groupsListView.render().$el.html(),
                secondList : teachersListView.render().$el.html()
            }
            var compiledTemplate = _.template( MainTemplate, data);
            $("#content").html(compiledTemplate);
            chartView.render();
            return this;
        }
    });
    return MainDepartmentView;
});