
define([
  'jquery',
  'underscore',
  'backbone',
  'views/fa/tabChildView',
  'models/group/GroupModel',
  'collections/groups/GroupsCollection',
  'collections/teachers/TeachersCollection',
  'collections/departments/DepartmentsCollection'



  ], function($, _, Backbone, TabChildView, GroupModel, GroupsCollection, TeachersCollection, DepartmentsCollection){

    var TabChildtudentsInGroupView = Backbone.View.extend({


      tagName: 'div',

      setConfig: function(){
        var config = {
          model: GroupModel,
          col: this.groups_col,
          data: [{
            _link: 'name',
            label:'Group Name',
            type: 'Text'
          },
          {
            _link: 'teacher_id',
            label: 'Curator',
            type: 'select',
            src:this.teachers_col.toJSON()
          },
          {
            _link: 'department_id',
            label: 'Department',
            type: 'select',
            src:this.departments_col.toJSON()
          }
          ],
        };

        return config;
      },

      loadData: function(){
        var that = this;

        this.groups_col = new GroupsCollection();
        this.teachers_col = new TeachersCollection();
        this.departments_col = new DepartmentsCollection();

        $.when(this.groups_col.fetch() && this.teachers_col.fetch() && this.departments_col.fetch()).then(function(){
          that.trigger('onDataLoaded');
        })
      },


      initialize: function(){
        var that = this;

        that.loadData();
        this.on('onDataLoaded', function(){
          that.config = that.setConfig();
          that.childView = new TabChildView(that.config);
          that.render();
        });
      },

      render: function (){
        var that=this;

      //console.log(that.childView.$el.html());
      var htmlContent = that.childView.$el.html()

      //when everything has loaded - trigger global event
      GlobalEventBus.trigger('tabChildSupViewLoaded', htmlContent, that.config);
      return this;
    }

  });

return  TabChildtudentsInGroupView;

});