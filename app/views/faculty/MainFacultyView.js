define([
    'jquery',
    'underscore',
    'backbone',
    'collections/departments/DepartmentsCollection',
    'collections/courses/CoursesCollection',
    'views/shared/ListView',
    'views/shared/ChartView',
    'text!templates/shared/MainTemplate.html',
    'collections/faculties/FacultiesCollection',
    'collections/faculties/FacultyChangeCollection'
], function($, _, Backbone, DepartmentsCollection, CoursesCollection, ListView, ChartView, MainTemplate, FacultiesCollection, FacultyChangeCollection){

    var MainFacultyView = Backbone.View.extend({
        
        loadData: function(){
            var that = this;
           
            faculties_col = new FacultiesCollection();
            departments_col = new DepartmentsCollection();
            courses_col = new CoursesCollection();
            faculty_change_col = new FacultyChangeCollection();
            
            $.when(faculties_col.fetch() && departments_col.fetch()  
            && courses_col.fetch() && faculty_change_col.fetch()).then(function(){
            	that.render();
            })
        },

        initialize:function(id){
        	this.element_id = id; 
        	this.loadData();
        },

        render:function(){
            var faculty_name = faculties_col.get(this.element_id).toJSON().name;

            var departmentsListView = new ListView({
                collection:departments_col,
                linkTo:"department"
            });
            var coursesListView = new ListView({
                collection:courses_col,
                linkTo:"course"
            });
			var chartView = new ChartView({
				collection:faculty_change_col
            });


            var data = {
                name: faculty_name,
                firstListTitle: "Список кафедр",
                secondListTitle: "Список курсів",
                firstList : departmentsListView.render().$el.html(),
                secondList : coursesListView.render().$el.html()
            }
            var compiledTemplate = _.template( MainTemplate, data);
            $("#content").html(compiledTemplate);
            chartView.render();
            return this;
        }
    });
    return MainFacultyView;
});

