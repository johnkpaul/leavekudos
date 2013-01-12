define([
  'underscore',
  'backbone',
  'models/kudos',
  'app'
], function(_, Backbone, KudosModel){

  var KudosCollection = Backbone.Collection.extend({
      model: KudosModel,
      initialize : function(models, options) {},
      url : function() {
        return require('app').baseUrl + '/api/kudos/mostrecent';
      }
  });

  return KudosCollection;

});
