define([
  'jquery',
  'underscore',
  'backbone',
  'marionette',
  'tpl!templates/venueView.html'
], function($, _, Backbone, Marionette, venueTemplate){
  var VenueView = Marionette.ItemView.extend({
    template: venueTemplate
  });

  return VenueView;
  
});

