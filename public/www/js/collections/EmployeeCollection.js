define([
  'underscore',
  'backbone',
  'models/employee'
], function(_, Backbone, EmployeeModel){

  var EmployeeCollection = Backbone.Collection.extend({
      model: EmployeeModel,
      initialize : function(models, options) {
        this.venueId = options.venueId;
      },
      url : function() {
        return '/api/venue/'+ 123 + '/employees';
      },
  });

  return EmployeeCollection;

});

