define([
    'jquery',
    'underscore',
    'backbone',
    'views/teacher/TableView',
    'views/teacher/TeacherAddWorkDialogView',
    'text!templates/teacher/mainTeacherTemplate.html',
    'models/teacher/TeacherModel',
    'collections/students/StudentsProxyCollectionForTeacherPage',
    'collections/groups/GroupsCollection'
], function($, _, Backbone,
            TableView,
            TeacherAddWorkDialogView,
            mainTeacherTemplate,
            TeacherModel,
            StudentsProxyCollectionForTeacherPage,
            GroupsCollection){

    var TeacherView = Backbone.View.extend({
        initialize:function(id){
            var me = this;

            this.id = id;

            this.teacherModel = new TeacherModel();
            this.teacherModel.fetch({
              async: false,
              data: {
                filter: {
                  id: this.id
                }
              },
              success: function() {
                //me.trigger('DataLoaded', 'Teacher');
              }
            });

            this.groupsCollection = new GroupsCollection();
            this.groupsCollection.fetch({
              async: false,
              data: {
                filter: {
                  teacher_id: this.id
                }
              },
              success: function() {
              }
            });

            this.studentsColOfTeachGroup = new StudentsProxyCollectionForTeacherPage();
            this.studentsColOfTeachGroup.fetch({
              async: false,
              data: {
                filter: {
                  group_id: this.groupsCollection.toJSON()[0].id
                }
              },
              success: function() {
              }
            });

            this.render();

            this.on('destroy', function(){
            me.off();
            me.remove();
          });
        },

        render:function(){
          var teacher = this.teacherModel.toJSON()[0];

          console.log(this.studentsColOfTeachGroup);

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