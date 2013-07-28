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
        loadData: function(id){
            facId = id;
            var that = this;

            facs_col = new FacultiesCollection();
            facs_col.fetch({
            	success: function () {
                    that.trigger('DataLoaded', 'Facs', facs_col);
                }
            });

            departments_col = new DepartmentsCollection();
            departments_col.fetch({
                success:function () {
                    that.trigger('DataLoaded', 'Deps', departments_col);
                }
            });

            courses_col = new CoursesCollection();
            courses_col.fetch({
                success:function () {
                    that.trigger('DataLoaded', 'Courses',courses_col);
                }
            });

            faculty_change_col = new FacultyChangeCollection();
            faculty_change_col.fetch({
                success:function () {
                    that.trigger('DataLoaded', 'FacultyChange', faculty_change_col);
                }
            });
        },

        initialize:function(){
            var isFacLoaded = false;
            var isDepsLoaded = false;
            var isCoursesLoaded = false;
            var isFacChangeLoaded = false;
            var that = this;

            this.on('DataLoaded', function (item) {
                if (item == 'Facs') {
                    isFacLoaded = true;
                }
                if (item == 'Deps'){
                    isDepsLoaded = true;
                }
                if (item == 'Courses'){
                    isCoursesLoaded = true;
                }
                if (item == 'FacultyChange'){
                    isFacChangeLoaded = true;
                }
                if ((isFacLoaded && isDepsLoaded && isCoursesLoaded && isFacChangeLoaded) == true){
                    that.render();
                }
            });
        },

        render:function(){
            var fac_name = facs_col.get(facId).toJSON().name;

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
                name: fac_name,
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

