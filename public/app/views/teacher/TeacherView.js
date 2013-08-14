define([
    'jquery',
    'underscore',
    'backbone',
    'collections/departments/DepartmentsCollection',
    'collections/courses/CoursesCollection',
    'views/shared/ListView',
    'views/shared/ChartView',
    'text!templates/teacher/teacherTemplate.html',
    'collections/faculties/FacultiesCollection',
    'collections/faculties/FacultyChangeCollection',
    'collections/teachers/TeachersCollection'
], function($, _, Backbone,
            DepartmentsCollection,
            CoursesCollection,
            ListView,
            ChartView,
            teacherTemplate,
            FacultiesCollection,
            FacultyChangeCollection,
            TeachersCollection){

    var TeacherView = Backbone.View.extend({
        initialize:function(id){
            var that = this;

            teachers_col = new TeachersCollection();
            teachers_col.fetch({
                success: function() {
                    that.trigger('DataLoaded', 'Teachs');
                }
            });

            faculty_change_col = new FacultyChangeCollection();
            faculty_change_col.fetch({
                success:function () {
                    that.trigger('DataLoaded', 'FacultyChange');
                }
            });

            var isTeachLoaded = false;
            var isFacChangeLoaded = false;


            this.on('DataLoaded', function (item) {
                if (item == 'Teachs') {
                    isTeachLoaded = true;
                }

                if (item == 'FacultyChange'){
                    isFacChangeLoaded = true;
                }

                if ((isTeachLoaded && isFacChangeLoaded) == true){
                    that.render(id);
                }
            });
        },

        render:function(id){
          var teacher = teachers_col.get(id).toJSON();

          var chartView = new ChartView({
            collection:faculty_change_col
          });

          var data = {
            teacher: teacher
          }

          console.info(data.name)

          var compiledTemplate = _.template(teacherTemplate, data);
          $("#content").html(compiledTemplate);
          chartView.render();
          return this;
        }
    });
    return TeacherView;
});