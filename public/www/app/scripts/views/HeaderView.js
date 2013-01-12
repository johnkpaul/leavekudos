define([
  'jquery',
  'underscore',
  'backbone',
  'marionette',
  'tpl!templates/header.html',
], function($, _, Backbone,  Marionette, headerTemplate){
  var HeaderView = Marionette.ItemView.extend({
    events: {
        "click .js-back": "clickBack"
    },
    template: headerTemplate,
    clickBack: function(){
      require("app").vent.trigger("back");
    },
    showBack: function(){
      this.$(".js-back").show();
    },
    hideBack: function(){
      this.$(".js-back").hide();
    },
  });

  return HeaderView;
  
});

