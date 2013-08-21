define([
    'jquery',
    'underscore',
    'backbone',
    'collections/departments/DepartmentsCollection',
    'collections/courses/CoursesCollection',
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

            var teachers_col = new TeachersCollection();
            teachers_col.fetch({
                success: function() {
                    that.trigger('DataLoaded', 'Teachs');
                }
            });

            var students_col_for_confirm = new StudentsCollectionForTeacherConfirmations();
            students_col_for_confirm.fetch({
                success: function() {
                    that.trigger('DataLoaded', 'StudentsForConfirm');
                }
            });

            var students_col_of_teach_group = new StudentsCollectionOfTeacherGroup();
            students_col_of_teach_group.fetch({
                success: function() {
                    that.trigger('DataLoaded', 'StudentsOfTeacherGroup');
                }
            });

            var faculty_change_col = new FacultyChangeCollection();
            faculty_change_col.fetch({
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
                    that.render(id, teachers_col, students_col_for_confirm, students_col_of_teach_group, faculty_change_col);
                }
            });
        },

        render:function(id, teachers_col, students_col_for_confirm, students_col_of_teach_group, faculty_change_col){
          var teacher = teachers_col.get(id).toJSON();

          var students_col_for_confirm_json = students_col_for_confirm.toJSON();
          var students_col_of_teach_group = students_col_of_teach_group.toJSON();

          var dataForMainTeacherTemplate = {
            teacher: teacher
          }
          var compiledTemplate = _.template(mainTeacherTemplate, dataForMainTeacherTemplate);
          $("#content").html(compiledTemplate);

          var dataForTeacherThesisTemplate = {
            students_for_confirm: students_col_for_confirm_json,
            students_of_teach_group: students_col_of_teach_group
          }

          var teacherStudentsGroupCompiledTemplate = _.template(teacherStudentsGroupTemplate, dataForTeacherThesisTemplate);
          $("#teacherPageContent").html(teacherStudentsGroupCompiledTemplate);

          return this;
        }
    });
    return TeacherView;
});