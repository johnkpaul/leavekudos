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
      this.kudos.set('employee_description', $target.val());
      this.proceed();
    },
    selectEmployee: function(e){
      var $target = $(e.target)
      this.kudos.set('employee_id', $target.data('employee-id'));
      this.kudos.set('employee_name', $target.data('employee-name'));
      this.kudos.set('employee_description', $target.data('employee-description'));
      this.proceed();
    },
    proceed:function(){
      require('app').router.controller.loadLastPage(this.kudos);
    },
    initialize:function(){
      this.kudos = new KudosModel();
      this.kudos.set('vanue_id', this.collection.venueId);
      this.model.set('collection', this.collection.toJSON())
    }
  });

  return LeaveKudosView;
  
});

