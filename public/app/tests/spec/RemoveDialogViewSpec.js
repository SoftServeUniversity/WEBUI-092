describe('RemoveDialog view', function() {


  var me = this;
  
  //me.model = 
  define([
  'jquery',
  'underscore',
  'backbone',
  'views/shared/RemoveDialogView'
   ], function ($, _, Backbone,  RemoveDialogView) {

    me.RemoveDialogView = RemoveDialogView;

    var model = Backbone.Model.extend({ 
      urlRoot: '/test/'
    });
    
    me.testModel = new model({
      id: 1,
      name: "test"
    })
    
    me.textConfig = {
    	header: 'test header',
    	message: 'test message'
    }
  
    me.el = $('<div id="content"></div>');
    me.view = new me.RemoveDialogView({el: me.el, model: me.testModel}, me.textConfig);

  })


  it('should be able to create its test objects', function() {
    expect(me.el).toBeDefined();
    expect(me.testModel).toBeDefined();
    expect(me.textConfig).toBeDefined();
  });


  
  describe ('when view is constructing', function() {

    it('should exist', function(){
      expect(me.view).toBeDefined();
    });

  })


  describe ('when view is rendered', function() {

    it('should contain good html', function(){
      expect(me.view.$el.find('#delete-modal').length).toBe(1);
      expect(me.view.$el.html()).toContain(me.textConfig.header);
      expect(me.view.$el.html()).toContain(me.textConfig.message);    
    });

    it ('should be rendered only once', function(){
       me.view2 = new me.RemoveDialogView({el: me.el, model: me.testModel}, me.textConfig);
       me.view3 = new me.RemoveDialogView({el: me.el, model: me.testModel}, me.textConfig);

       expect(me.el.find('#delete-modal').length).toBe(1);
    });

  })


  describe("events", function (){
    
    beforeEach(function() {
       me.view = new me.RemoveDialogView({el: me.el, model: me.testModel}, me.textConfig);
    })


    describe("removal", function(){
 
      it("triggers removeElement action", function() {

        var spy = spyOn(me.view, 'removeElement').andCallThrough();
        me.view.delegateEvents();

        me.view.$el.find('.confirm-yes').trigger('click')
        expect(spy).toHaveBeenCalled();

      });

      it("triggers model destroy method", function(){        
        var spy = spyOn(me.view.model, 'destroy');

        me.view.$el.find('.confirm-yes').trigger('click')
        expect(spy).toHaveBeenCalled();
      })
    
    })
    
    describe("cancellation", function(){
      
      it("triggers cancelAction action", function() {

        var spy = spyOn(me.view, 'cancelAction').andCallThrough();
        me.view.delegateEvents();

        me.view.$el.find('.confirm-no').trigger('click')
        expect(spy).toHaveBeenCalled();
        
      });

    })

  })

});