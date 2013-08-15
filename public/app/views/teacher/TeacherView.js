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
    'collections/teachers/TeachersCollection',
    'collections/students/StudentsProxyCollectionForTeacherPage'
], function($, _, Backbone,
            DepartmentsCollection,
            CoursesCollection,
            ListView,
            ChartView,
            teacherTemplate,
            FacultiesCollection,
            FacultyChangeCollection,
            TeachersCollection,
            StudentsProxyCollectionForTeacherPage){

    var TeacherView = Backbone.View.extend({
        initialize:function(id){
            var that = this;

            teachers_col = new TeachersCollection();
            teachers_col.fetch({
                success: function() {
                    that.trigger('DataLoaded', 'Teachs');
                }
            });

            students_col = new StudentsProxyCollectionForTeacherPage();
            students_col.fetch({
                success: function() {
                    that.trigger('DataLoaded', 'Students');
                }
            });

            faculty_change_col = new FacultyChangeCollection();
            faculty_change_col.fetch({
                success:function () {
                    that.trigger('DataLoaded', 'FacultyChange');
                }
            });

            var isTeachLoaded = false;
            var isStudentsLoaded = false;
            var isFacChangeLoaded = false;


            this.on('DataLoaded', function (item) {
                if (item == 'Teachs') {
                    isTeachLoaded = true;
                }

                if (item == 'Students'){
                    isStudentsLoaded = true;
                }

                if (item == 'FacultyChange'){
                    isFacChangeLoaded = true;
                }

                if ((isTeachLoaded && isFacChangeLoaded && isStudentsLoaded) == true){
                    that.render(id);
                }
            });
        },

        render:function(id){
          var teacher = teachers_col.get(id).toJSON();

          var students_json = students_col.toJSON();

          students = {};
          for (var i = 0; i < students_json.length; i++) {
            var course_number = students_json[i].course;
            if (!(course_number in students)){
              students[course_number] = [];
            }
            students[course_number].push(students_json[i]);
          };
          console.log(students);

          var chartView = new ChartView({
            collection:faculty_change_col
          });

          var data = {
            teacher: teacher,
            students: students
          }

          var compiledTemplate = _.template(teacherTemplate, data);
          $("#content").html(compiledTemplate);
          chartView.render();
          return this;
        }
    });
    return TeacherView;
});