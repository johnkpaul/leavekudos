define([
  'jquery',
  'underscore',
  'backbone',
  'tpl!templates/kudosView.html',
], function($, _, Backbone, homeTemplate){
  var HomeView = Backbone.Marionette.CompositeView.extend({
    template: homeTemplate
  });

  return HomeView;
  
});
