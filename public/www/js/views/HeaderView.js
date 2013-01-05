define([
  'jquery',
  'underscore',
  'backbone',
  'tpl!templates/header.html',
], function($, _, Backbone,  headerTemplate){
  var HeaderView = Backbone.Marionette.ItemView.extend({
    template: headerTemplate,
  });

  return HeaderView;
  
});

