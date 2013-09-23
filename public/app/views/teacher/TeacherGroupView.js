define([
    'jquery',
    'underscore',
    'backbone',
    'views/teacher/TableView',
    'views/teacher/TeacherAddWorkDialogView',
    'text!templates/teacher/mainTeacherTemplate.html',
    'models/teacher/TeacherModel',
    'collections/students/StudentsProxyCollectionForTeacherPage'
], function($, _, Backbone,
            TableView,
            TeacherAddWorkDialogView,
            mainTeacherTemplate,
            TeacherModel,
            StudentsProxyCollectionForTeacherPage){

    var TeacherView = Backbone.View.extend({
        initialize:function(id){
            var that = this;

            this.id = id;

            this.teacherModel = new TeacherModel();
            this.teacherModel.fetch({
              data: {
                filter: {
                  id: this.id
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
                  teacher_id: this.id
                }
              },
              success: function() {
                that.trigger('DataLoaded', 'StudentsOfTeacherGroup');
              }
            });

            var isTeachLoaded = false;
            var isStudentsOfTeacherGroupLoaded = false;

            this.on('DataLoaded', function (item) {
                if (item == 'Teacher') {
                    isTeachLoaded = true;
                }

                if (item == 'StudentsOfTeacherGroup'){
                    isStudentsOfTeacherGroupLoaded = true;
                }

                if ((isTeachLoaded &&
                     isStudentsOfTeacherGroupLoaded) == true){
                  that.render();
                }
            });

            this.on('destroy', function(){
            me.off();
            me.remove();
          });
        },

        render:function(){
          var teacher = this.teacherModel.toJSON()[0];

          var dataForMainTeacherTemplate = {
            teacher: teacher,
            // Mark active link in teacher menu
            activeLink: "teacherGroupPage"
          }
          var compiledTemplate = _.template(mainTeacherTemplate, dataForMainTeacherTemplate);
          $("#content").html(compiledTemplate);

          var tableStudInGroupView = new TableView({collection: this.studentsColOfTeachGroup});
          $("#teacherPageContent").html(tableStudInGroupView.el);

          var teacherAddWorkDialogView = new TeacherAddWorkDialogView(this.id);
          $("#teacherAddWorkDialogContent").html(teacherAddWorkDialogView.$el);

          return this;
        }
    });

    return TeacherView;
});