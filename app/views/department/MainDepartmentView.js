define([
    'jquery',
    'underscore',
    'backbone',
    'collections/GroupsCollection',
    'collections/TeachersCollection',
    'views/department/ListView',
    'views/department/ChartView',
    'text!templates/department/MainTemplate.html',
    'collections/DepartmentsCollection',

], function($, _, Backbone,GroupsCollection, TeachersCollection, ListView, ChartView, MainTemplate, DepartmentsCollection){

    var DepartmentView =  Backbone.View.extend({
        getName: function(id){
        	var deps_col = new DepartmentsCollection();
			deps_col.fetch({ url: "app/mocks/departments.json", async:false});
			this.dep_name = deps_col.get(id).toJSON().name;
        },
        initialize:function(){
            this.render();
        } ,
        render:function(){
            var groupsCollection = new GroupsCollection();
            groupsCollection.fetch({
                url: "app/mocks/groups.json",
                async:false
            });
            var teachersCollection = new TeachersCollection();
            teachersCollection.fetch({
                url: "app/mocks/teachers.json",
                async:false
            });

            var groupsListView = new ListView({
                collection:groupsCollection
            });
            var teachersListView = new ListView({
                collection:teachersCollection
            });

            var data = {
                // name defined temporary
                name: this.dep_name,
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