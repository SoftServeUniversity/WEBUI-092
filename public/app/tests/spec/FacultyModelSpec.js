describe('Faculty model :: test setting values', function() {

  beforeEach(function(){
    var me = this;
    require(['models/faculty/FacultyModel'], function(FacultyModel) {
      params = {
        name: 'test',
        id: '1',
        head_id: '2'
      }
      me.faculty = new FacultyModel(params);
    })
  });
  

  it ("instance of model should exist", function(){
    expect(this.faculty).toBeDefined();
  });

  describe ('test properties set', function() {
    it('should have all properties set', function(){
       expect(this.faculty.get('name')).toEqual('test');
       expect(this.faculty.get('id')).toEqual('1');
       expect(this.faculty.get('head_id')).toEqual('2') 
    });
  })

  describe ('test parameters send on save', function(){
    it('should send right parameters', function(){
      spyOn(this.faculty, 'save'); 

      // Now perform the operation that would invoke Collection.fetch.
      console.log(this.faculty)
      this.faculty.set({name: 'asdfa'})
      //this.faculty.set(params);
      this.faculty.save();
      //expect(this.faculty.save).toHaveBeenCalled();            // Verifies the fetch was actually called.
      expect(this.faculty.save).toHaveBeenCalledWith(params);   // Verifies that the fetch was called with specified param.

    })
  })

});