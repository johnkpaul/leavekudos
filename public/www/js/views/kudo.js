define([
  'jquery',
  'underscore',
  'backbone',
  'tpl!templates/kudoView.html',
], function($, _, Backbone, kudoViewTemplate){
  var KudosView = Backbone.Marionette.ItemView.extend({
    tagName: 'li',
    template: kudoViewTemplate
  });

  return KudosView;
  
});

