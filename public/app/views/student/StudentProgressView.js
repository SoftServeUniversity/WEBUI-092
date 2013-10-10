define([
  'jquery',
  'underscore',
  'backbone',
  'text!templates/shared/StTemplate.html',
  'views/shared/ListView',
  'views/shared/ChartView',
  'collections/students/StudentsCollection',
  'collections/students/StudentChangeCollection',
  //'collections/tasks/TasksCollection'
  'collections/work/WorkCollection'


],
   function($, _, Backbone, StTemplate, ListView, ChartView, StudentsCollection, StudentChangeCollection, WorkCollection){

       var StudentProgressView =  Backbone.View.extend({
           loadData: function(id){
               studentId = id;
               var me = this;

               students_col = new StudentsCollection();
               students_col.fetch({
                   data: {
                       filter: {
                           id:id
                       }
                   },
                   success: function () {
                       me.trigger('DataLoaded', 'Students');
                   }
               });

               works_col = new WorkCollection();
               works_col.fetch({
                   data: {
                       filter: {
                           student_id:id
                       }
                   },
                   success:function () {
                       me.trigger('DataLoaded', 'Works');
                   }
               });

               students_change_col = new StudentChangeCollection();
               students_change_col.fetch({
                   data: {
                       filter: {
                           progressable_id:id,
                           progressable_type:'Student'
                       }
                   },
                   success:function () {
                       me.trigger('DataLoaded', 'StudentsChange');
                   }
               });

           },

           initialize:function(){
               var isStudentsLoaded = false;
               var isWorksLoaded = true;
               var isStudentsChangeLoaded = false;

               var me = this;

               this.on('DataLoaded', function (item) {
                   if (item == 'Students') {
                       isStudentsLoaded = true;
                   }
                   if (item == 'Works'){
                       isWorksLoaded = true;
                   }
                   if (item == 'StudentsChange'){
                       isStudentsChangeLoaded = true;
                   }
                   if (isStudentsLoaded && isWorksLoaded && isStudentsChangeLoaded){
                       me.render();
                   }
               });

           },

           render:function(){
               var student_name = students_col.get(studentId).toJSON().name;


               var worksListView = new ListView({
                   collection:works_col,
                   linkTo:"work"
               });

               var chartView = new ChartView({
                   collection:students_change_col
               });
               var data = {
                   name: student_name,
                   listTitle: "Назви робіт",
                   list : worksListView.render().$el.html()

               }

               var compiledTemplate = _.template( StTemplate, data);
               $("#content").html(compiledTemplate);
               chartView.render();
               return this;
           }
       });
       return StudentProgressView;
   });


