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
      var me = this;

      faculties_col = new FacultiesCollection();
      faculties_col.fetch({
        data: {
          filter: {
            id:id
          }
        },
        success: function () {
          me.trigger('DataLoaded', 'Facs');
        }
      });

      departments_col = new DepartmentsCollection();
      departments_col.fetch({
        
        data: {
          filter: {
            faculty_id:id
          }
        },
        
        success: function () {
           me.trigger('DataLoaded', 'Deps');
        }

      });

      courses_col = new CoursesCollection();
      courses_col.fetch({
        data: {
          filter: {
            faculty_id:id
          }
        },
        success:function () {
          me.trigger('DataLoaded', 'Courses');
        }
      });

      faculty_change_col = new FacultyChangeCollection();
      faculty_change_col.fetch({
        data: {
          filter: {
            progressable_id:id,
            progressable_type:'Faculty'
          }
        },
        success:function () {
          me.trigger('DataLoaded', 'FacultyChange');
        }
      });
    },

    initialize:function(){
      var isFacLoaded = false;
      var isDepsLoaded = false;
      var isCoursesLoaded = false;
      var isFacChangeLoaded = false;
      var me = this;

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
          me.render();
        }
      });
    },

    render:function(){
      var faculty_name = faculties_col.get(facId).toJSON().name;

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