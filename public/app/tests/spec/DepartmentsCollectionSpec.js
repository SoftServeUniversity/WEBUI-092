describe('DepartmentsCollection', function() {
    var MOCK_GET_DATA = [
        {   "id":1,
            "name": "Кафедра прикладної математики",
            "percentage": 25,
            "head_of_department":1,
            "faculty_id":1
        },
        {   "id":3,
            "name": "Кафедра міжнародних відносин",
            "head_of_department":3,
            "faculty_id":3
        },
        {   "id":4,
            "name": "Кафедра економіки",
            "percentage": 100,
            "head_of_department":4,
            "faculty_id":4
        }
    ];
    var me = this;

    beforeEach(function(){
        require(['underscore', 'collections/departments/DepartmentsCollection', 'models/department/DepartmentModel'],
            function(_, DepartmentsCollection, DepartmentsModel) {
            me.expectedDepartmentsCollection = new DepartmentsCollection();
            me.expectedDepartmentsCollection.push(new DepartmentsModel({id:1, name:"Кафедра прикладної математики", percentage:25, head_of_department:1, faculty_id:1}));
            me.expectedDepartmentsCollection.push(new DepartmentsModel({id:3, name:"Кафедра міжнародних відносин", percentage:0, head_of_department:3, faculty_id:3}));
            me.expectedDepartmentsCollection.push(new DepartmentsModel({id:4, name:"Кафедра економіки", percentage:100, head_of_department:4, faculty_id:4}));
            
            me.actualDepartmentsCollection = new DepartmentsCollection();
            spyOn($, 'ajax').andCallFake(function(options) {
                options.success(MOCK_GET_DATA);
            });
            me.actualDepartmentsCollection.fetch();
        })
    });

    it('collection should contains 3 elements', function(){
        expect(me.actualDepartmentsCollection.length).toEqual(3);
    });

    it('expected collection should be equal to actual', function(){
        expect(me.actualDepartmentsCollection).toEqualCollection(me.expectedDepartmentsCollection);
    });


});
