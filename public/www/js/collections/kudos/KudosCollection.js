define([
  'underscore',
  'backbone',
  'models/kudos'
], function(_, Backbone, KudosModel){

  var KudosCollection = Backbone.Collection.extend({
      model: KudosModel,
      initialize : function(models, options) {},
      url : function() {
        return '/api/kudos/mostrecent';
      },
  });

  return KudosCollection;

});
