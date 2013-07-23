define([
    'jquery',
    'underscore',
    'backbone',
    'collections/departments/DepartmentsCollection',
    'collections/courses/CoursesCollection',
    'views/department/ListView',
    'views/department/ChartView',
    'text!templates/department/MainTemplate.html',
    'collections/faculties/FacultiesCollection'

], function($, _, Backbone, DepartmentsCollection, CoursesCollection, ListView, ChartView, MainTemplate, FacultiesCollection){

    var FacultyView =  Backbone.View.extend({
        loadData: function(id){
            facId = id;
            var that = this;

            facs_col = new FacultiesCollection();
            facs_col.fetch({  url: "app/collections/faculties/facultiesCollection.json",
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
        },

        initialize:function(){
            var isFacLoaded = false;
            var isDepsLoaded = false;
            var isCoursesLoaded = false;
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
                if ((isFacLoaded && isDepsLoaded && isCoursesLoaded) == true){
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
                collection:courses_col
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
            var chartView = new ChartView();
            chartView.render();
            return this;
        }
    });
    return FacultyView;
});