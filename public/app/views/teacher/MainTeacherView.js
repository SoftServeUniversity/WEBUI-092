define([
    'jquery',
    'underscore',
    'backbone',
    'collections/departments/DepartmentsCollection',
    'collections/courses/CoursesCollection',
    'views/shared/ListView',
    'views/shared/ChartView',
    'text!templates/teacher/mainTeacherTemplate.html',
    'text!templates/teacher/teacherThesisTemplate.html',
    'collections/faculties/FacultiesCollection',
    'collections/faculties/FacultyChangeCollection',
    'collections/teachers/TeachersCollection',
    'collections/students/StudentsProxyCollectionForTeacherPage'
], function($, _, Backbone,
            DepartmentsCollection,
            CoursesCollection,
            ListView,
            ChartView,
            mainTeacherTemplate,
            teacherThesisTemplate,
            FacultiesCollection,
            FacultyChangeCollection,
            TeachersCollection,
            StudentsProxyCollectionForTeacherPage){

    var TeacherView = Backbone.View.extend({
        initialize:function(id){
            var that = this;

            var teachers_col = new TeachersCollection();
            teachers_col.fetch({
                success: function() {
                    that.trigger('DataLoaded', 'Teachs');
                }
            });

            var students_col = new StudentsProxyCollectionForTeacherPage();
            students_col.fetch({
                success: function() {
                    that.trigger('DataLoaded', 'Students');
                }
            });

            var faculty_change_col = new FacultyChangeCollection();
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
                    that.render(id, teachers_col, students_col, faculty_change_col);
                }
            });
        },

        render:function(id, teachers_col, students_col, faculty_change_col){
          var teacher = teachers_col.get(id).toJSON();
          console.log(teacher);

          var students_json = students_col.toJSON();

          var students = {};
          for (var i = 0; i < students_json.length; i++) {
            var course_number = students_json[i].course;
            if (!(course_number in students)){
              students[course_number] = [];
            }
            students[course_number].push(students_json[i]);
          };

          var dataForMainTeacherTemplate = {
            teacher: teacher
          }
          var compiledTemplate = _.template(mainTeacherTemplate, dataForMainTeacherTemplate);
          $("#content").html(compiledTemplate);

          var dataForTeacherThesisTemplate = {
            students: students
          }
          var teacherThesisCompiledTemplate = _.template(teacherThesisTemplate, dataForTeacherThesisTemplate);
          $("#teacherPageContent").html(teacherThesisCompiledTemplate);

          var chartView = new ChartView({
            collection:faculty_change_col
          });
          chartView.render();

          return this;
        }
    });
    return TeacherView;
});