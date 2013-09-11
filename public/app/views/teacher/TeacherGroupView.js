define([
    'jquery',
    'underscore',
    'backbone',
    'collections/departments/DepartmentsCollection',
    'collections/courses/CoursesCollection',
    'views/teacher/TableView',
    'text!templates/teacher/mainTeacherTemplate.html',
    'collections/faculties/FacultiesCollection',
    'collections/faculties/FacultyChangeCollection',
    'models/teacher/TeacherModel',
    'collections/students/StudentsProxyCollectionForTeacherPage',
    'collections/teachers/TeachersCollection',
], function($, _, Backbone,
            DepartmentsCollection,
            CoursesCollection,
            TableView,
            mainTeacherTemplate,
            FacultiesCollection,
            FacultyChangeCollection,
            TeacherModel,
            StudentsProxyCollectionForTeacherPage,
            TeachersCollection){

    var TeacherView = Backbone.View.extend({
        initialize:function(id){
            var that = this;

            this.teacherModel = new TeacherModel();
            this.teacherModel.fetch({
              data: {
                filter: {
                  id: id
                }
              },
              success: function() {
                that.trigger('DataLoaded', 'Teacher');
              }
            });

            this.studentsColOfTeachGroup = new StudentsProxyCollectionForTeacherPage();
            this.studentsColOfTeachGroup.fetch({
              data: {
                filter: {
                  teacher_id: id
                }
              },
              success: function() {
                that.trigger('DataLoaded', 'StudentsOfTeacherGroup');
              }
            });

            this.faculty_change_col = new FacultyChangeCollection();
            this.faculty_change_col.fetch({
              success:function () {
                  that.trigger('DataLoaded', 'FacultyChange');
              }
            });

            var isTeachLoaded = false;
            var isStudentsOfTeacherGroupLoaded = false;
            var isFacChangeLoaded = false;

            this.on('DataLoaded', function (item) {
                if (item == 'Teacher') {
                    isTeachLoaded = true;
                }

                if (item == 'StudentsOfTeacherGroup'){
                    isStudentsOfTeacherGroupLoaded = true;
                }

                if (item == 'FacultyChange'){
                    isFacChangeLoaded = true;
                }

                if ((isTeachLoaded &&
                     isFacChangeLoaded &&
                     isStudentsOfTeacherGroupLoaded) == true){
                  that.render(id);
                }
            });
        },

        render:function(id){
          var teacher = this.teacherModel.toJSON()[0];

          var dataForMainTeacherTemplate = {
            teacher: teacher,
            activeLink: "teacherGroupPage"
          }
          var compiledTemplate = _.template(mainTeacherTemplate, dataForMainTeacherTemplate);
          $("#content").html(compiledTemplate);

          var tableStudInGroupView = new TableView({collection: this.studentsColOfTeachGroup});
          $("#teacherPageContent").html(tableStudInGroupView.el);

          return this;
        }
    });
    return TeacherView;
});