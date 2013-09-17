describe('Admin View', function() {
  
  var adminView;
  
  beforeEach(function(){
        
    GlobalEventBus = _.extend({}, Backbone.Events);
    
    runs( function () {
      require(['views/admin/adminView'], function(AdminView) {
        adminView = new AdminView();
      })
    });

    waitsFor(function () { 
      return adminView; 
    }, 'Admin view load timeout', 1000);

  });

  
  it('should be able to create its test objects', function() {
    expect(adminView).toBeDefined();
  });


  it('should have configuration properties set', function(){
    expect(typeof adminView.tabMenuConfig.isArray).toBeTruthy();
    expect(typeof adminView.defaultActiveTab).toBe("string");
    expect(typeof adminView.headline).toBe("string");
  });
  

});

