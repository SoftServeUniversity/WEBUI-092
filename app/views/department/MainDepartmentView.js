define([
    'jquery',
    'underscore',
    'backbone',
    'collections/groups/GroupsCollection',
    'collections/teachers/TeachersCollection',
    'views/department/ListView',
    'views/department/ChartView',
    'text!templates/department/MainTemplate.html',
    'collections/departments/DepartmentsCollection',


], function($, _, Backbone, GroupsCollection, TeachersCollection, ListView, ChartView, MainTemplate, DepartmentsCollection){

    var DepartmentView =  Backbone.View.extend({
        loadData: function(id){
            depId = id;
            var that = this;

        	deps_col = new DepartmentsCollection();
			deps_col.fetch({
                success: function () {
                    that.trigger('DataLoaded', 'Deps', deps_col);
                }
            });

            groups_col = new GroupsCollection();
            groups_col.fetch({
                success:function () {
                    that.trigger('DataLoaded', 'Groups', groups_col);
                }
            });

            teachers_col = new TeachersCollection();
            teachers_col.fetch({
                success:function () {
                    that.trigger('DataLoaded', 'Teachers',teachers_col);
                }
            });
        },

        initialize:function(){
            var isDepLoaded = false;
            var isGroupsLoaded = false;
            var isTeachersLoaded = false;
            var that = this;

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
                if ((isDepLoaded && isGroupsLoaded && isTeachersLoaded) == true){
                    that.render();
                }
            });
        },

        render:function(){
            var dep_name = deps_col.get(depId).toJSON().name;

            var groupsListView = new ListView({
                collection:groups_col
            });
            var teachersListView = new ListView({
                collection:teachers_col
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
            var chartView = new ChartView();
            chartView.render();
            return this;
        }
    });
    return DepartmentView;
});