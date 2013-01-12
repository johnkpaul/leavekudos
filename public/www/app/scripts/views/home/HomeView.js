define([
  'jquery',
  'underscore',
  'backbone',
  'views/KudosView',
  'tpl!templates/home/homeTemplate.html',
], function($, _, Backbone, KudosView, homeTemplate){
  var HomeView = Backbone.Marionette.CompositeView.extend({
    template: homeTemplate,
    itemView: KudosView
  });

  return HomeView;
  
});
