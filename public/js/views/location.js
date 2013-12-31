define([
  'jquery', 
  'underscore', 
  'backbone',
  'text!templates/location.html'
  ], function($, _, Backbone, locationTemplate){
  var LocationView = Backbone.View.extend({
    tagName: 'li',
    className: 'location',

    template: _.template(locationTemplate),

    events: {
      'click': 'open'
    },

    initialize: function() {
      this.model.on('change', this.render, this);
      this.model.on('destroy', this.remove, this);
    },

    render: function() {
      var $el = $(this.el);
// may need to rename listId to locationId not sure yet 
      $el.data('locationId', this.model.get('id'));
      $el.html(this.template(this.model.toJSON()));
      return this;
    },

    open: function() {
      var self = this;
      return false;
    }
  });

  return LocationView;
});