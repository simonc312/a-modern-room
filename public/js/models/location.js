define(['underscore', 'backbone'], function(_, Backbone) {
  var LocationModel = Backbone.Model.extend({
    
    Location: function() { },

    eventDescription: function() {return "Event Description"},
    // Default attributes for the todo.
    defaults: {
      content: 'empty Location...',
      enabled: false
    },

    // Ensure that each Location created has `content`.
    initialize: function() {
      if (!this.get('content')) {
        this.set({'content': this.defaults.content});
      }
    },

    // Remove this Location from *localStorage*
    clear: function() {
      this.destroy();
    }

  });
  return LocationModel;
});
