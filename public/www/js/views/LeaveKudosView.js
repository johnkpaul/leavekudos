define([
  'jquery',
  'underscore',
  'backbone',
  'models/kudos',
  'tpl!templates/leaveKudos.html',
], function($, _, Backbone, KudosModel, leaveKudosTemplate){
  var LeaveKudosView = Backbone.Marionette.ItemView.extend({
    template: leaveKudosTemplate,
    events: {
        "click .js-select-employee": "selectEmployee", 
        "blur .js-employee-description": "inputEmployeeDescription"
    },
    inputEmployeeDescription: function(e){
      var $target = $(e.target)
      this.kudos.get('employee').description = $target.data('employee-description');
      this.proceed();
    },
    selectEmployee: function(e){
      var $target = $(e.target)
      this.kudos.get('employee').id = $target.data('employee-id');
      this.proceed();
    },
    proceed:function(){
      require('app').router.controller.loadLastPage(this.kudos);
    },
    initialize:function(){
      this.kudos = new KudosModel();
      var user_id = document.cookie.split(";").map(function(i){return i.split("=");}).filter(function(i){return i[0].trim() == "fsq_user_id"})[0][1];
      this.kudos.set('venue_id', this.collection.venueId);
      this.kudos.set('foursquare_user_id', user_id);
      this.kudos.set('employee', {});
      this.model.set('collection', this.collection.toJSON())
    }
  });

  return LeaveKudosView;
  
});

