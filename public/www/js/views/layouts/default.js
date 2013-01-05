define([
  'jquery', 
  'underscore', 
  'backbone',
  'tpl!templates/layouts/default.html',
], function($, _, Backbone, template){
  var defaultLayout = Marionette.Layout.extend({
    template: template, 
    regions:{
      content:"#content"
    }
  });

  return defaultLayout;
});
