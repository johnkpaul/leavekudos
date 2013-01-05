define([
  'jquery',
  'underscore',
  'backbone',
  'models/kudos',
  'tpl!templates/lastKudosView.html',
], function($, _, Backbone, KudosModel, lastKudosViewTemplate){
  var LastKudosView = Backbone.Marionette.ItemView.extend({
    template: lastKudosViewTemplate,
    events: {
        "click .js-submit-kudos": "submitKudos"
    },
    submitKudos:function(){
      var anecdote = this.$("textarea").val()
      this.kudos.set('anecdote', anecdote);
      console.log(this.kudos.toJSON());
      console.log("submitting kudos");
      this.kudos.save().then(function(){
        require("app").router.controller.loadHome();
      });
    },
    initialize:function(){
      this.kudos = this.model
    }
  });

  return LastKudosView;
  
});


