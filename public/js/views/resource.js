define([
  'jquery', 
  'underscore', 
  'backbone',
  'cprogress',
  'text!templates/resource.html'
  ], function($, _, Backbone, cprogress, ResourceTemplate){
  var ResourceView = Backbone.View.extend({

    //... is a list tag.
    tagName:  'li',

    // Cache the template function for a single resource.
    template: _.template(ResourceTemplate),

    // The DOM events specific to an item.
    events: {
      "hover div.resource-content" : "showResourceHelper",
      "mouseout div.resource-content" : "hideResourceHelper",
      "click span.resource-destroy"   : "clear"
    },

    // The ResourceView listens for changes to its model, re-rendering. Since there's
    // a one-to-one correspondence between a **resource** and a **resourceView** in this
    // app, we set a direct reference on the model for convenience.
    initialize: function() {
      this.listenTo(this.model, 'change', this.render);
      // in case the model is destroyed via a collection method
      // and not by a user interresource from the DOM, the view
      // should remove itself
      this.listenTo(this.model, 'destroy', this.remove);
    },

    // Re-render the contents of the resource item.
    // To avoid XSS (not that it would be harmful in this particular app),
    // we use underscore's "<%-" syntax in template to set the contents of the resource item.
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

    showResourceHelper: function(){
        var helper = this.$el.find('.resource-helper-bottom').first();
        helper.fadeIn();
    },
    hideResourceHelper: function(){
        var helper = this.$el.find('.resource-helper-bottom').first();
        helper.fadeOut();
    },

    // Remove the item, destroy the model.
    clear: function() {
      this.model.clear();
    }

  });
  return ResourceView;
});
