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
    'collections/teachers/TeachersCollection',
    'collections/work/WorksCollectionOfTeacherGroup',
], function($, _, Backbone,
            DepartmentsCollection,
            CoursesCollection,
            TableView,
            mainTeacherTemplate,
            FacultiesCollection,
            FacultyChangeCollection,
            TeachersCollection,
            WorksCollectionOfTeacherGroup){

    var TeacherView = Backbone.View.extend({
        initialize:function(id){
            var that = this;

            this.teachersCollection = new TeachersCollection();
            this.teachersCollection.fetch({
                success: function() {
                    that.trigger('DataLoaded', 'Teachs');
                }
            });

            this.worksColOfTeachGroup = new WorksCollectionOfTeacherGroup();
            this.worksColOfTeachGroup.fetch({
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
            //var isStudentsForConfirmLoaded = false;
            var isStudentsOfTeacherGroupLoaded = false;
            var isFacChangeLoaded = false;


            this.on('DataLoaded', function (item) {
                if (item == 'Teachs') {
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
          var teacher = this.teachersCollection.get(id).toJSON();

          var dataForMainTeacherTemplate = {
            teacher: teacher
          }
          var compiledTemplate = _.template(mainTeacherTemplate, dataForMainTeacherTemplate);
          $("#content").html(compiledTemplate);

          var tableStudInGroupView = new TableView({collection: this.worksColOfTeachGroup});
          $("#teacherPageContent").html(tableStudInGroupView.el);

          return this;
        }
    });
    return TeacherView;
});