define(['underscore', 'backbone'], function(_, Backbone) {
  var BaseModel = Backbone.Model.extend({

    defaults: {
      content: 'empty Model...',
      enabled: false,
    },

    // Ensure that each Event created has `content`.
    initialize: function() {
      if (!this.get('content')) {
        this.set({'content': this.defaults.content});
      }
    },

    eventDescription: function() {return "Event Description"},

    // Remove this Event from *localStorage*
    clear: function() {
      this.destroy();
    }

  });
  return BaseModel;
});
