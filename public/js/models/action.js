define(['underscore', 'backbone'], function(_, Backbone) {
  var ActionModel = Backbone.Model.extend({
    
    action: function() { },

  // how long it takes before action can be performed again

    eventDescription: function() {return "Event Description"},
    //associated location where action is enabled
    location: "location",
    // Default attributes for the todo.
    defaults: {
      content: 'empty Action...',
      enabled: false,
      timeOutDuration: function(){return 100},
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
