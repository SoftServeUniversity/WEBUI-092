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
    'collections/teachers/TeacherChangeCollection',
    'collections/teachers/TeachersCollection',
    'collections/students/StudentsProxyCollectionForTeacherPage'
], function($, _, Backbone,
            DepartmentsCollection,
            CoursesCollection,
            ListView,
            ChartView,
            mainTeacherTemplate,
            teacherThesisTemplate,
            TeacherChangeCollection,
            TeachersCollection,
            StudentsProxyCollectionForTeacherPage){

    var TeacherView = Backbone.View.extend({
        initialize:function(id){
            var that = this;

            var teachersCollection = new TeachersCollection();
            teachersCollection.fetch({
                success: function() {
                    that.trigger('DataLoaded', 'Teachs');
                }
            });

            var studentsCollection = new StudentsProxyCollectionForTeacherPage();
            studentsCollection.fetch({
                success: function() {
                    that.trigger('DataLoaded', 'Students');
                }
            });

            var teacherChangeCollection = new TeacherChangeCollection();
            teacherChangeCollection.fetch({
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
                    that.render(id, teachersCollection, studentsCollection, teacherChangeCollection);
                }
            });
        },

        render:function(id, teachersCollection, studentsCollection, teacherChangeCollection){
          var teacher = teachersCollection.get(id).toJSON();

          var studentsJSON = studentsCollection.toJSON();

          var students = {};
          for (var i = 0; i < studentsJSON.length; i++) {
            var course_number = studentsJSON[i].course;
            if (!(course_number in students)){
              students[course_number] = [];
            }
            students[course_number].push(studentsJSON[i]);
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
            collection: teacherChangeCollection
          });
          chartView.render();

          return this;
        }
    });
    return TeacherView;
});