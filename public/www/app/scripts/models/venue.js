define([
  'jquery',
  'underscore',
  'backbone'
], function($, _, Backbone){
  var Venue = Backbone.Model.extend({
      url: function(){
           return require('app').baseUrl + '/api/venue/' + this.id;
      }
  });
  return Venue;
  
});

