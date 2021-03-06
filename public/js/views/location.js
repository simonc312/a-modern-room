define([
  'jquery', 
  'underscore', 
  'backbone',
  'js/collections/actions',
  'text!templates/location.html'
  ], function($, _, Backbone, ActionCollection, locationTemplate){
  
  var LocationView = Backbone.View.extend({
    tagName: 'li',
    className: 'location',

    template: _.template(locationTemplate),

    events: {
      'click': 'updateAndMoveActions'
    },

    initialize: function() {
      this.model.on('change', this.render, this);
      this.model.on('destroy', this.remove, this);
    },

    render: function() {
      var $el = $(this.el);
      $el.data('locationId', this.model.get('id'));
      $el.html(this.template(this.model.toJSON()));
      return this;
    },

    moveActions: function(){
        $('ul#action-list > div').not('#'+this.model.get('content')).animate({'width':'0px','margin-right':'0px'});
$('#'+this.model.get('content')).animate({'width':'30%','margin-right':'120px'});
    },

    updateAndMoveActions: function() {
  
  //set enabled for each action if matching location
      ActionCollection.setEnabled(this.model.get("content"));
      this.moveActions();
      return false;
    }
  });

  return LocationView;
});
