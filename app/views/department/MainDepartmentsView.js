define([
    'jquery',
    'underscore',
    'backbone',
    'views/department/DepartmentsListView',
    'views/department/CoursesListView',
    'views/department/ChartView',
    'text!templates/department/MainDepartmentsTemplate.html'
], function($, _, Backbone, DepartmentsListView, CoursesListView, ChartView, mainDepartmentsTemplate){

    var DepartmentsView =  Backbone.View.extend({

        initialize:function(){
            this.render();
        } ,
        render:function(){

            var departmentsListView = new DepartmentsListView();
            var coursesListView = new CoursesListView();

            var data = {
                departmentsList : departmentsListView.render().$el.html(),
                coursesList : coursesListView.render().$el.html()
            }
            var compiledTemplate = _.template( mainDepartmentsTemplate, data);
            $('#content').empty();
            $("#content").append(compiledTemplate);
            var chartView = new ChartView();
            chartView.render();
            return this;
        }
    });
    return DepartmentsView;
});