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

], function($, _, Backbone,DepartmentsCollection, CoursesCollection, ListView, ChartView, MainTemplate, FacultiesCollection){
	
    var FacultyView =  Backbone.View.extend({
        getFacultyName: function(id){
        	var facs_col = new FacultiesCollection();
			facs_col.fetch({ url: "app/collections/faculties/facultiesCollection.json", async:false});
			facs_col.on('load', thid.onFacsCollectionLoadedRenderer)
			
			
			
        },
        initialize:function(){
            this.render();
            var isFacLoaded = false;
            var isDepLoaded = false;
            var isCourseLoaded...;
            
            this.on('DataLoaded', function (item) {
            	if (item == 'Facilities') {
            		isFacLoaded = true;
            	}
            	if 
            	if (isFacLoaded && isDep...)
            		this.render
            });
        },
        
        onFacs... () {
        	this.fac_name = facs_col.get(id).toJSON().name;
        	this.trigger('DataLoaded', 'Facilities');
        }
        render:function(){
            var departmentsCollection 	= new DepartmentsCollection();
            departmentsCollection.fetch({
                url			: "app/mocks/departments.json",
                async		: false
            });
            
            var coursesCollection 		= new CoursesCollection();
            coursesCollection.fetch({
                url			: "app/mocks/courses.json",
                async		: false
            });

            var departmentsListView		= new ListView({
                collection	: departmentsCollection,
                linkTo		: "department"
            });
            
            var coursesListView = new ListView({
                collection:coursesCollection
            });

            var data = {
                // name defined temporary
                name: this.fac_name,
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