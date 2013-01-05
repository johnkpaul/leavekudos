define([
  'jquery',
  'underscore',
  'backbone',
  'tpl!templates/leaveKudos.html',
], function($, _, Backbone, KudosView, leaveKudosTemplate){
  var LeaveKudosView = Backbone.Marionette.ItemView.extend({
    template: leaveKudosTemplate
  });

  return LeaveKudosView;
  
});

