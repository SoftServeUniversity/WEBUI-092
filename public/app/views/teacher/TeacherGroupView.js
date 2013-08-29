define([
    'jquery',
    'underscore',
    'backbone',
    'collections/departments/DepartmentsCollection',
    'collections/courses/CoursesCollection',
    'views/teacher/TableView',
    'text!templates/teacher/mainTeacherTemplate.html',
    'text!templates/teacher/teacherStudentsGroupTemplate.html',
    'collections/faculties/FacultiesCollection',
    'collections/faculties/FacultyChangeCollection',
    'collections/teachers/TeachersCollection',
    'collections/students/StudentsCollectionForTeacherConfirmations',
    'collections/students/StudentsCollectionOfTeacherGroup',
], function($, _, Backbone,
            DepartmentsCollection,
            CoursesCollection,
            TableView,
            mainTeacherTemplate,
            teacherStudentsGroupTemplate,
            FacultiesCollection,
            FacultyChangeCollection,
            TeachersCollection,
            StudentsCollectionForTeacherConfirmations,
            StudentsCollectionOfTeacherGroup){

    var TeacherView = Backbone.View.extend({
        initialize:function(id){
            var that = this;

            this.teachersCollection = new TeachersCollection();
            this.teachersCollection.fetch({
                success: function() {
                    that.trigger('DataLoaded', 'Teachs');
                }
            });

            this.studentsCollForConfirm = new StudentsCollectionForTeacherConfirmations();
            this.studentsCollForConfirm.fetch({
                success: function() {
                    that.trigger('DataLoaded', 'StudentsForConfirm');
                }
            });

            this.studentsColOfTeachGroup = new StudentsCollectionOfTeacherGroup();
            this.studentsColOfTeachGroup.fetch({
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
            var isStudentsForConfirmLoaded = false;
            var isStudentsOfTeacherGroupLoaded = false;
            var isFacChangeLoaded = false;


            this.on('DataLoaded', function (item) {
                if (item == 'Teachs') {
                    isTeachLoaded = true;
                }

                if (item == 'StudentsForConfirm'){
                    isStudentsForConfirmLoaded = true;
                }

                if (item == 'StudentsOfTeacherGroup'){
                    isStudentsOfTeacherGroupLoaded = true;
                }

                if (item == 'FacultyChange'){
                    isFacChangeLoaded = true;
                }

                if ((isTeachLoaded && isFacChangeLoaded &&
                     isStudentsForConfirmLoaded && isStudentsOfTeacherGroupLoaded) == true){
                    that.render(id);
                }
            });
        },

        render:function(id){
          var teacher = this.teachersCollection.get(id).toJSON();

          var dataForMainTeacherTemplate = {
            teacher: teacher
          }
          var compiledTemplate = _.template(mainTeacherTemplate, dataForMainTeacherTemplate);
          $("#content").html(compiledTemplate);
/*
          var dataForTeacherThesisTemplate = {
            students_for_confirm: students_col_for_confirm_json,
            students_of_teach_group: students_col_of_teach_group
          }

          var teacherStudentsGroupCompiledTemplate = _.template(teacherStudentsGroupTemplate, dataForTeacherThesisTemplate);
          $("#teacherPageContent").html(teacherStudentsGroupCompiledTemplate);
*/
          var tableStudForConfirmView = new TableView({collection: this.studentsCollForConfirm});
          $("#teacherPageContent").html(tableStudForConfirmView.el);

          var tableStudInGroupView = new TableView({collection: this.studentsColOfTeachGroup});
          $("#teacherPageContent").html(tableStudInGroupView.el);

          return this;
        }
    });
    return TeacherView;
});