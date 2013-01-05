define([
  'underscore',
  'backbone',
  'models/checkin'
], function(_, Backbone, CheckinModel){

  var CheckinCollection = Backbone.Collection.extend({
      model: CheckinModel,
      initialize : function(models, options) {},
      url : function() {
        return '/api/checkins';
      },
  });

  return CheckinCollection;

});
