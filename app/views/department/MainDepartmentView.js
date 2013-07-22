define([
    'jquery',
    'underscore',
    'backbone',
    'views/department/GroupsListView',
    'views/department/TeachersListView',
    'views/department/ChartView',
    'text!templates/department/MainDepartmentTemplate.html'
], function($, _, Backbone, GroupsListView, TeachersListView, ChartView, MainDepartmentTemplate){

    var DepartmentView =  Backbone.View.extend({

        initialize:function(){
            this.render();
        } ,
        render:function(){
            var groupsListView = new GroupsListView();
            var teachersListView = new TeachersListView();

            var data = {
                groupsList : groupsListView.render().$el.html(),
                teachersList : teachersListView.render().$el.html()
            }
            var compiledTemplate = _.template( MainDepartmentTemplate, data);
            $('#content').empty();
            $("#content").append(compiledTemplate);
            var chartView = new ChartView();
            chartView.render();
            return this;
        }
    });
    return DepartmentView;
});