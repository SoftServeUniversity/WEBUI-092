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

    me.testModel = Backbone.Model.extend({
      id: 1,
  	  name: "test"
    })
    
    me.textConfig = {
    	header: 'test header',
    	message: 'test message'
    }
  })


  it('should be able to create its test objects', function() {
    expect(me.testModel).toBeDefined()
  });
 
  describe ('Instance', function() {

    it('should be created using arguments', function(){
      me.view = new me.RemoveDialogView({model: me.testModel}, me.textConfig);
      expect(me.view).toBeDefined();
    });

    it('should have necessary properties set', function(){
      console.log(me.view)
      //expect(2).toEqual(3)
    })



  })

});