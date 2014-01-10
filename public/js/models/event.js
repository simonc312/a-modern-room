define(['underscore', 'backbone'], function(_, Backbone) {
  var EventModel = Backbone.Model.extend({
    
    Event: function() { },

    defaults: {
      content: 'empty Event...',
      enabled: false,
    },

    // Ensure that each Event created has `content`.
    initialize: function() {
      if (!this.get('content')) {
        this.set({'content': this.defaults.content});
      }
    },

    // Remove this Event from *localStorage*
    clear: function() {
      this.destroy();
    }

  });
  return EventModel;
});
