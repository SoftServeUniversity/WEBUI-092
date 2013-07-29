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

    var DepartmentView =  Backbone.View.extend({
        loadData: function(){
            var that = this;

        	deps_col = new DepartmentsCollection();
            groups_col = new GroupsCollection();
            teachers_col = new TeachersCollection();
            dep_change_col = new DepartmentChangeCollection();
            
            $.when(deps_col.fetch() && groups_col.fetch() 
            && teachers_col.fetch() && dep_change_col.fetch()).then(function(){
            	that.render();
            })
        },

        initialize:function(id){
        	this.id = id;
        	this.loadData(this.id);
        },

        render:function(){
        	var that = this;
        	
            var dep_name = deps_col.get(that.id).toJSON().name;

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
    return DepartmentView;
});