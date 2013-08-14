describe('Parent Admin View :: event handlers on user actions', function() {
  var adminView;
  beforeEach(function(){
    var that = this;

    
        GlobalEventBus = _.extend({}, Backbone.Events);
        runs( function () {
            require(['views/admin/adminView'], function(AdminView) {
              adminView = new AdminView();
            })
        });

        waitsFor(function () { return adminView; } , 'Admin view load timeout', 1000);

  });
  

   it('should be truthy', function(){
     expect(typeof adminView.initialize).toBe("function")  
   });
  
});

