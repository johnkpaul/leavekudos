define([
  'jquery',
  'underscore',
  'backbone',
  'tpl!templates/checkinView.html',
], function($, _, Backbone, checkinTemplate){
  var CheckinView = Backbone.Marionette.ItemView.extend({
    template: checkinTemplate,
    onRender: function(){}
  });

  return CheckinView;
  
});
