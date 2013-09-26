
describe('Faculty model', function() {


  var me = this;
    
  var MOCK_GET_DATA = {
        name: 'faculty_name',
        id: 1,
        head_id: 2
  };

  var MOCK_POST_DATA = {
    success: true
  };


  require(['models/faculty/FacultyModel'], function(FacultyModel) {
    me.FacultyModel = FacultyModel;
  })


  it('should be able to create its test objects', function() {
    var faculty = new me.FacultyModel();

    expect(faculty).toBeDefined();
    expect(MOCK_GET_DATA).toBeDefined();
    expect(MOCK_POST_DATA).toBeDefined();
  });


  describe ('test if properties set correctly', function() {
    it('should have all properties set', function(){
       var faculty = new me.FacultyModel(MOCK_GET_DATA);

       expect(faculty.get('name')).toEqual('faculty_name');
       expect(faculty.get('id')).toEqual(1);
       expect(faculty.get('head_id')).toEqual(2) 
    });
  })



  describe('when it saves', function(){

    it('should call through to .ajax with proper params', function() {

      var faculty = new me.FacultyModel();

      spyOn($, 'ajax').andCallFake(function(options) {
        options.success(MOCK_POST_DATA);
      });

      faculty.set(MOCK_GET_DATA);
      faculty.save({}); 

      var ajaxCallParams = $.ajax.mostRecentCall.args[0]; 
      var parsedParams = JSON.parse(ajaxCallParams.data);
      
      expect(parsedParams.name).toEqual('faculty_name');
      expect(parsedParams.id).toEqual(1);
      expect(parsedParams.head_id).toEqual(2) 

    })
  })



  describe('when it fetches', function() {
    var faculty;

    beforeEach(function() {
      spyOn($, 'ajax').andCallFake(function(options) {
        options.success(MOCK_GET_DATA);
      });

      faculty = new me.FacultyModel();
      faculty.fetch();
    });

    afterEach(function() {
      faculty = undefined;
    });

    it('should call through to .ajax with proper params', function() {
      var ajaxCallParams = $.ajax.mostRecentCall.args[0]; 

      console.log(ajaxCallParams)
      expect(ajaxCallParams.dataType).toEqual('json');
      expect(ajaxCallParams.type).toEqual('GET');
      expect(ajaxCallParams.success).toBeDefined();
    });

    it('should be able to parse mocked service response', function() {
      expect(_.isEmpty(faculty.attributes)).toEqual(false);
      expect(faculty.get('name')).toEqual('faculty_name');
      expect(faculty.get('id')).toEqual(1);
      expect(faculty.get('head_id')).toEqual(2);
    });
  });

});
