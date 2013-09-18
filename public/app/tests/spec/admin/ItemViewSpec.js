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

    me.view = new ItemView({model: me.model, conf: me.config});

  })
  

  it('should be able to create its test objects', function() {
    expect(me.model).toBeDefined();
    expect(me.config).toBeDefined();
    expect(me.view).toBeDefined();
  });

  
  it('should be tied to correct DOM element when created', function() {
    expect(me.view.el.tagName.toLowerCase()).toBe('tr');
  });


  describe("Rendering", function() {
    
    it("returns the view object", function() {
      expect(me.view.render()).toEqual(me.view);
    });
    
    it("produces the correct HTML", function() {
      me.view.render();
      console.log(me.view.el)
      expect(me.view.$el.find('.toggle-input').val()).toEqual("Course_ABD0");
      expect(me.view.$el.find('.toggle-text').html()).toContain("Course_ABD0");
    });  

  })

})
