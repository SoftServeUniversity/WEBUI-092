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

  beforeEach(function(){
    var that = this;

    

        runs( function () {
            require(['views/admin/adminView'], function(AdminView) {
              that.adminView = new AdminView();
            })
        });

        waitsFor(function () {return that.adminView; } , 'Admin view load timed out', 1000);

  });
  
  //цей виконається (teacher має метод sayBuhaha, що повертає 'bu-ha-ha')
  it('should be truthy', function(){
     expect(typeof this.adminView.initialize).toBe("function")  
   });
  
});

