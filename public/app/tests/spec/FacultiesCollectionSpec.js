describe('Faculty collection', function() {


  var me = this;
    
  var MOCK_GET_DATA = {
        name: 'faculty_name',
        id: 1,
        head_id: 2
  };

  var MOCK_POST_DATA = {
    success: true
  };


  require(['collections/faculties/FacultiesCollection'], function(FacultiesCollection) {
    me.FacultiesCollection = FacultiesCollection;
  })


  it('should be able to create its test objects', function() {
    var faculty = new me.FacultyModel();

    expect(faculty).toBeDefined();
    expect(MOCK_GET_DATA).toBeDefined();
    expect(MOCK_POST_DATA).toBeDefined();
  });


  it('Can add Model instances as objects and arrays.', function() {
    
    var faculties = new me.FacultiesCollection();
    expect(faculties.length).toBe(0);
    faculties.add({ text: 'test' });
    
    // how many faculties have been added so far?
    expect(faculties.length).toBe(1);
    faculties.add([
      { text: 'test' },
      { text: 'test' }
    ]);
    
    // how many are there in total now?
    expect(faculties.length).toBe(3);
  })


  it('Has correct url property.', function() {
    var faculties = new me.FacultiesCollection()
  
    // what has been specified as the url base in our model?
    expect(faculties.url).toBe('/faculties/');

  });
  



});
