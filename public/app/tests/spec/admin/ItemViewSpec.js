describe('ItemView', function() {

    var me = this; 
    require(['models/course/CourseModel', 'views/admin/itemView'], function(CourseModel, ItemView) {
      me.model = new CourseModel({
        id: 1,
        name: "Course_ABD0",
        year_of_start: "2012-02-01",
        faculty_id: 1,
        created_at: "2013-09-11 06:09:18",
        updated_at: "2013-09-11 06:09:18"
      })
    
      me.view = ItemView;
          console.log('me.view')

    })

    me.config = {

      model: me.model,
      
      fields: {
        
        name: {
          label:'Назва курсу',
          type:'text'
        }
      },

      buttons: {
        create: 'Додати курс'
      }

    };


    //$('body').append('<table id="itemsTable"></table>');
    this.ItemView = new me.view({ model: me.model, conf: me.config });
  




  it('should work', function(){
     expect(2).toEqual(2);
  });









})
