define([
  'jquery', 
  'underscore', 
  'backbone',
  'marionette',
  'tpl!templates/layouts/default.html',
], function($, _, Backbone, Marionette, template){
  var defaultLayout = Marionette.Layout.extend({
    template: template, 
    regions:{
      content:"#content"
    }
  });

  return defaultLayout;
});
