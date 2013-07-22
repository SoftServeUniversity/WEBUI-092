define([
    'jquery',
    'underscore',
    'backbone',
    'views/department/DepartmentsListView',
    'views/department/CoursesListView',
    'views/department/ChartView',
    'text!templates/department/MainFacultyTemplate.html',
    'collections/faculties/FacultiesCollection',

], function($, _, Backbone, DepartmentsListView, CoursesListView, ChartView, MainFacultyTemplate, FacultiesCollection){

    var FacultyView =  Backbone.View.extend({
        getFacultyName: function(id){
        	var facs_col = new FacultiesCollection();
			facs_col.fetch({ url: "app/collections/faculties/facultiesCollection.json", async:false});
			this.fac_name = facs_col.get(id).toJSON().name;
        },
        initialize:function(){
            this.render();
        } ,
        render:function(){

            var departmentsListView = new DepartmentsListView();
            var coursesListView = new CoursesListView();

            var data = {
            	facultyName : this.fac_name,
                departmentsList : departmentsListView.render().$el.html(),
                coursesList : coursesListView.render().$el.html()
            }
            var compiledTemplate = _.template( MainFacultyTemplate, data);
            $('#content').empty();
            $("#content").append(compiledTemplate);
            var chartView = new ChartView();
            chartView.render();
            return this;
        }
    });
    return FacultyView;
});