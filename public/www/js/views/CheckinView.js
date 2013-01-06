define([
  'jquery',
  'underscore',
  'backbone',
  'marionette',
  'tpl!templates/checkinView.html'
], function($, _, Backbone, Marionette, checkinTemplate){
  var CheckinView = Marionette.ItemView.extend({
    events: {
        "click a": "selectCheckin"
    },
    tagName: "li",
    template: checkinTemplate,
    selectCheckin: function(e){
      e.preventDefault();
      require("app").router.controller.leaveKudosFor(this.model);
    },
    onRender: function(){}
  });

  return CheckinView;
  
});
