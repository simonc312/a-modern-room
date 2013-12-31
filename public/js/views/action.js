define([
  'jquery', 
  'underscore', 
  'backbone',
  'text!templates/action.haml'
  ], function($, _, Backbone, ActionTemplate){
  var ActionView = Backbone.View.extend({

    //... is a list tag.
    tagName:  'li',

    // Cache the template function for a single action.
    template: _.template(ActionTemplate),

    // The DOM events specific to an item.
    events: {
      "click div.Action-content" : "perform",
      "click span.Action-destroy"   : "clear"
    },

    // The ActionView listens for changes to its model, re-rendering. Since there's
    // a one-to-one correspondence between a **Action** and a **ActionView** in this
    // app, we set a direct reference on the model for convenience.
    initialize: function() {
      this.listenTo(this.model, 'change', this.render);
      // in case the model is destroyed via a collection method
      // and not by a user interaction from the DOM, the view
      // should remove itself
      this.listenTo(this.model, 'destroy', this.remove);
    },

    // Re-render the contents of the Action item.
    // To avoid XSS (not that it would be harmful in this particular app),
    // we use underscore's "<%-" syntax in template to set the contents of the Action item.
    render: function() {
      this.$el.html(this.template(this.model.toJSON()));
      this.cacheInput();
      return this;
    },

    cacheInput: function() {
      this.$input = this.$('.Action-input');
    },

    // Switch this view into `"performing"` mode, display grey progress bar
    performing: function() {
      this.$el.addClass('performing')
    },

    // Close the `"performing"` mode
    close: function() {
      this.$el.removeClass('performing');
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
  return ActionView;
});
