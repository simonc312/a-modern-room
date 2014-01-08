define([
  'jquery', 
  'underscore', 
  'backbone',
  'cprogress',
  'js/collections/resources',
  'text!templates/action.html'
  ], function($, _, Backbone, cprogress, ResourceCollection, ActionTemplate){
  var ActionView = Backbone.View.extend({

    //... is a list tag.
    tagName:  'li',

    // Cache the template function for a single action.
    template: _.template(ActionTemplate),

    // The DOM events specific to an item.
    events: {
      "click div.action-content" : "perform",
      "hover div.action-content" : "showActionHelper",
      "mouseout div.action-content" : "hideActionHelper",
      "click span.action-destroy"   : "clear"
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
      this.$input = this.$('.action-input');
    },

    // Switch this view into `"performing"` mode, display grey progress bar
    perform: function() {
      //perform only if the cost can be satisfied
      // otherwise trigger event saying not enough of what resource
      var modelsAndCosts = this.checkResources();
      if(!$.isEmptyObject(modelsAndCosts)){
        this.useResources(modelsAndCosts);
        var obj = this.$el;
        var content = this.$el.find('.action-content').first();
        content.cprogress({
	        percent: 0, // starting position
          img1: 'css/v1.png', //background
          img2: 'css/v2.png', //foreground
	        speed: this.model.get('timeOutDuration'), // speed (timeout)
	        PIStep : 0.05, // every step foreground area is bigger about this val
	        limit: 100, // end value
	        loop : false, //if true, no matter if limit is set, progressbar will be running
	        showPercent : true, //show hide percent
	        onInit: function(){content.addClass('performing');},
	        onProgress: function(){}, //p=current percent
	        onComplete: function(){obj.find('.jCProgress').remove();    content.removeClass('performing');}
        });
      }
    },

    // Close the `"performing"` mode after timeOutDuration 
    close: function(el) {
      el.removeClass('performing');
      
    },

    checkResources: function(){
      var modelsAndCosts = {};
      var ResourceCosts = this.model.get('cost');
      $.each(ResourceCosts,function(resourceName, cost){
      // match is the model instance in collection that matches resourceName to check if it is possible to subtract costs without non negative amount. Return a key value pair array of Models and cost to subtract if all matches.checkSubtract(cost) are true 
        var match = ResourceCollection.find(function(resource){return resource.get('content') == resourceName});
        if(match.checkSubtract(cost)){
          modelsAndCosts[match.id] = cost;
          }
        else {alert("Not enough " + match.get('content')); return false;}
      });
      return modelsAndCosts;
    },

    useResources: function(modelsAndCosts){
      $.each(modelsAndCosts,
        function(modelId,cost){
          var model = ResourceCollection.get(modelId);
          model.subtract(cost);        
        });
    },

    triggerEventDescription: function (){

    },


    // Remove this view from the DOM.
    // Remove event listeners from: DOM, this.model
    remove: function() {
      this.stopListening();
      this.undelegateEvents();
      this.$el.remove();
    },

    showActionHelper: function(){
      if(this.$el.find('.performing').first().length == 0){
        var helper = this.$el.find('.action-helper-right').first();
        helper.fadeIn();
      }
    },
    hideActionHelper: function(){
        var helper = this.$el.find('.action-helper-right').first();
        helper.fadeOut();
    },

    // Remove the item, destroy the model.
    clear: function() {
      this.model.clear();
    }

  });
  return ActionView;
});
