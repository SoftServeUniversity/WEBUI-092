define([
    'jquery',
    'underscore',
    'backbone',
    'collections/DepartmentsCollection',
    'collections/CoursesCollection',
    'views/department/ListView',
    'views/department/ChartView',
    'text!templates/department/MainTemplate.html',
    'collections/faculties/FacultiesCollection',
    'collections/faculties/FacultyChangeCollection',


], function($, _, Backbone,DepartmentsCollection, CoursesCollection, ListView, ChartView, MainTemplate, FacultiesCollection, FacultyChangeCollection){

    var FacultyView =  Backbone.View.extend({
        getFacultyName: function(id){
        	var facs_col = new FacultiesCollection();
			facs_col.fetch({ url: "app/mocks/faculties.json", async:false});
			this.fac_name = facs_col.get(id).toJSON().name;
        },
        initialize:function(){
        },
        render:function(){
            var departmentsCollection = new DepartmentsCollection();
            departmentsCollection.fetch({
                url: "app/mocks/departments.json",
                async:false
            });
            var coursesCollection = new CoursesCollection();
            coursesCollection.fetch({
                url: "app/mocks/courses.json",
                async:false
            });
            var facultyChangeCollection = new FacultyChangeCollection();
            facultyChangeCollection.fetch({
                async:false
            });
            
            
            var departmentsListView = new ListView({
                collection:departmentsCollection,
                linkTo:"department"
            });
            var coursesListView = new ListView({
                collection:coursesCollection
            });

			var chartView = new ChartView({
				collection: facultyChangeCollection
            });

            var data = {
                // name defined temporary
                name: this.fac_name,
                firstListTitle: "Список кафедр",
                secondListTitle: "Список курсів",
                firstList : departmentsListView.render().$el.html(),
                secondList : coursesListView.render().$el.html(),
                
            }
            var compiledTemplate = _.template( MainTemplate, data);
            $("#content").html(compiledTemplate);
            chartView.render()
            return this;
        }
    });
    return FacultyView;
});