define([
  'jquery', 
  'underscore', 
  'backbone',
  'text!templates/event.html'
  ], function($, _, Backbone, EventTemplate){
  var EventView = Backbone.View.extend({

    //... is a list tag.
    tagName:  'li',

    // Cache the template function for a single Event.
    template: _.template(EventTemplate),

    // The DOM events specific to an item.
    events: {
      "click span.Event-destroy"   : "clear"
    },

    // The EventView listens for changes to its model, re-rendering. Since there's
    // a one-to-one correspondence between a **Event** and a **EventView** in this
    // app, we set a direct reference on the model for convenience.
    initialize: function() {
      this.listenTo(this.model, 'change', this.render);
      // in case the model is destroyed via a collection method
      // and not by a user interEvent from the DOM, the view
      // should remove itself
      this.listenTo(this.model, 'destroy', this.remove);
    },

    // Re-render the contents of the Event item.
    // To avoid XSS (not that it would be harmful in this particular app),
    // we use underscore's "<%-" syntax in template to set the contents of the Event item.
    render: function() {
      this.$el.html(this.template(this.model.toJSON()));
      return this;
    },


    // Remove this view from the DOM.
    // Remove event listeners from: DOM, this.model
    remove: function() {
      this.stopListening();
      this.undelegateEvents();
      this.$el.remove();
    },

    // Remove the item, destroy the model.
    clear: function() {
      this.model.clear();
    }

  });
  return EventView;
});
