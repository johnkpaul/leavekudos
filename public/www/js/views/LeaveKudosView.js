define([
  'jquery',
  'underscore',
  'backbone',
  'marionette',
  'models/kudos',
  'tpl!templates/leaveKudos.html',
], function($, _, Backbone, Marionette, KudosModel, leaveKudosTemplate){
  var LeaveKudosView = Marionette.ItemView.extend({
    template: leaveKudosTemplate,
    events: {
        "click .js-select-employee": "selectEmployee", 
        "blur .js-employee-description": "inputEmployeeDescription"
    },
    inputEmployeeDescription: function(e){
      var $target = $(e.target)
      this.kudos.set('employee', {});
      this.kudos.get('employee').description = $target.val();
      this.proceed();
    },
    selectEmployee: function(e){
      var $target = $(e.target)
      this.kudos.set('employee_id', $target.data('employee-id'));
      this.proceed();
    },
    proceed:function(){
      require('app').router.controller.loadLastPage(this.kudos);
    },
    initialize:function(){
      this.kudos = new KudosModel();
      var user_id = document.cookie.split(";").map(function(i){return i.split("=");}).filter(function(i){return i[0].trim() == "fsq_userid"})[0][1];
      this.kudos.set('venue_id', this.collection.venueId);
      this.kudos.set('foursquare_user_id', user_id);
      this.model.set('collection', this.collection.toJSON())
    }
  });

  return LeaveKudosView;
  
});

