define([
  'jquery',
  'underscore',
  'backbone',
  'marionette',
  'tpl!templates/kudoView.html',
], function($, _, Backbone, Marionette, kudoViewTemplate){
  var KudosView = Marionette.ItemView.extend({
    tagName: 'li',
    template: kudoViewTemplate
  });

  return KudosView;
  
});

