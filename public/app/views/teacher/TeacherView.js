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

          var students = students_col.toJSON();
          courses = {};
          for (var i = 0; i < students.length; i++) {
            var course_number = 'course_'+students[i].course;
            if (!(course_number in courses)){
              courses[course_number] = [];
            }
            courses[course_number].push(students[i]);
          };
          console.log(courses);

          var chartView = new ChartView({
            collection:faculty_change_col
          });

          var data = {
            teacher: teacher,

          }

          var compiledTemplate = _.template(teacherTemplate, data);
          $("#content").html(compiledTemplate);
          chartView.render();
          return this;
        }
    });
    return TeacherView;
});