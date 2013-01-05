define([
  'jquery',
  'underscore',
  'backbone'
], function($, _, Backbone){
  var Kudos = Backbone.Model.extend({
      urlRoot:'/api/kudos',
      paramRoot:false
  });
  return Kudos;
  
});
