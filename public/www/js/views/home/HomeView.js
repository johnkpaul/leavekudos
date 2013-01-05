define([
  'jquery',
  'underscore',
  'backbone',
  'tpl!templates/home/homeTemplate.html',
], function($, _, Backbone, homeTemplate){
  var HomeView = Backbone.Marionette.ItemView.extend({
    template: homeTemplate
  });

  return HomeView;
  
});
