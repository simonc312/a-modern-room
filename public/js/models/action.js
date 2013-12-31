define(['underscore', 'backbone'], function(_, Backbone) {
  var ActionModel = Backbone.Model.extend({
    
    action: function() { },

  // how long it takes before action can be performed again
    timeOutDuration: function() {return 2},

    eventDescription: function() {return "Event Description"},
    // Default attributes for the todo.
    defaults: {
      content: 'empty Action...',
      enabled: false,
      timeOutDuration: 0,
      cost: 0
    },

    // Ensure that each Action created has `content`.
    initialize: function() {
      if (!this.get('content')) {
        this.set({'content': this.defaults.content});
      }
    },

    // Remove this Action from *localStorage*
    clear: function() {
      this.destroy();
    }

  });
  return ActionModel;
});