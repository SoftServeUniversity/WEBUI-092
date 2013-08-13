/*describe 'NewCardView', ->

  view = null
  beforeEach ->
    loadFixtures "index.html"
    view = new NewCardView

  it 'binds $el to the right DOM element', ->
    expect( view.$el ).toBe( 'section#new-card' )

  it 'triggers a create-card event when the add card button is clicked', ->
    eventSpy = sinon.spy()
    view.on( 'create-card', eventSpy )

    $('section#new-card button').click()

    expect( eventSpy ).toHaveBeenCalledWith(view)



.delete-button
*/

describe('Parent Admin View :: event handlers on user actions', function() {
  var adminView;
  beforeEach(function(){
    var that = this;

    

        runs( function () {
            require(['views/admin/adminView'], function(AdminView) {
              adminView = new AdminView();
            })
        });

        waitsFor(function () { return adminView; } , 'Admin view load timeout', 1000);

  });
  
  //цей виконається (teacher має метод sayBuhaha, що повертає 'bu-ha-ha')
  it('should be truthy', function(){
     expect(typeof adminView.initialize).toBe("function")  
   });
  
});

