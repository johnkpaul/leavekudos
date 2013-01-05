define([
  'jquery',
  'underscore',
  'backbone',
  'tpl!templates/leaveKudos.html',
], function($, _, Backbone, leaveKudosTemplate){
  var LeaveKudosView = Backbone.Marionette.ItemView.extend({
    template: leaveKudosTemplate,
    onRender: function(){
      
    }
  });

  return LeaveKudosView;
  
});

