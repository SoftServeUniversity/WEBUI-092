define([
    'jquery',
    'underscore',
    'backbone',
    'collections/departments/DepartmentsCollection',
    'collections/courses/CoursesCollection',
    'views/shared/ListView',
    'views/shared/ChartView',
    'text!templates/teacher/mainTeacherTemplate.html',
    'text!templates/teacher/teacherWorksTemplate.html',
    'collections/teachers/TeacherChangeCollection',
    'collections/teachers/TeachersCollection',
    'collections/work/WorksCollectionOfTeacher'
], function($, _, Backbone,
            DepartmentsCollection,
            CoursesCollection,
            ListView,
            ChartView,
            mainTeacherTemplate,
            teacherWorksTemplate,
            TeacherChangeCollection,
            TeachersCollection,
            WorksCollectionOfTeacher){

    var TeacherView = Backbone.View.extend({
        initialize:function(id){
            var that = this;

            var teachersCollection = new TeachersCollection();
            teachersCollection.fetch({
                success: function() {
                    that.trigger('DataLoaded', 'Teachs');
                }
            });

            var worksCollection = new WorksCollectionOfTeacher();
            worksCollection.fetch({
                success: function() {
                    that.trigger('DataLoaded', 'Works');
                }
            });

            var teacherChangeCollection = new TeacherChangeCollection();
            teacherChangeCollection.fetch({
                success:function () {
                    that.trigger('DataLoaded', 'FacultyChange');
                }
            });

            var isTeachLoaded = false;
            var isWorkssLoaded = false;
            var isFacChangeLoaded = false;

            this.on('DataLoaded', function (item) {
                if (item == 'Teachs') {
                    isTeachLoaded = true;
                }

                if (item == 'Works'){
                    isWorkssLoaded = true;
                }

                if (item == 'FacultyChange'){
                    isFacChangeLoaded = true;
                }

                if ((isTeachLoaded && isFacChangeLoaded && isWorkssLoaded) == true){
                    that.render(id, teachersCollection, worksCollection, teacherChangeCollection);
                }
            });
        },

        render:function(id, teachersCollection, worksCollection, teacherChangeCollection){
          var teacher = teachersCollection.get(id).toJSON();

          var worksJSON = worksCollection.toJSON();

          var works = {};
          for (var i = 0; i < worksJSON.length; i++) {
            var course_name = worksJSON[i].course_name;
            if (!(course_name in works)){
              works[course_name] = [];
            }
            works[course_name].push(worksJSON[i]);
          };

          var dataForMainTeacherTemplate = {
            teacher: teacher
          }
          var compiledTemplate = _.template(mainTeacherTemplate, dataForMainTeacherTemplate);
          $("#content").html(compiledTemplate);

          var dataForTeacherThesisTemplate = {
            works: works
          }
          var teacherThesisCompiledTemplate = _.template(teacherWorksTemplate, dataForTeacherThesisTemplate);
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