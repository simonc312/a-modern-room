define([
  'jquery', 
  'underscore', 
  'backbone',
  'cprogress',
  'js/collections/resources',
  'js/collections/events',
  'text!templates/action.html'
  ], function($, _, Backbone, cprogress, ResourceCollection, EventCollection, ActionTemplate){
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
      var progress = this.$el.find('.jCProgress').first();
      this.$el.html(this.template(this.model.toJSON()));
      var isEnabled = this.$el.find('.enabled').first().length > 0;
      if(progress.length){
        if(!isEnabled){progress.hide();}
        else{progress.show();}
        this.$el.find('.action-content').first().addClass('performing').append(progress);
      }
      return this;
    },

    // Switch this view into `"performing"` mode, display grey progress bar
    perform: function() {
      //perform only if the cost can be satisfied
      // otherwise trigger event saying not enough of what resource
      var modelsAndCosts = this.checkResources();
      if(!$.isEmptyObject(modelsAndCosts)){
        var prodResources = this.model.get('prodResource');
        this.useResources(modelsAndCosts);
        var ResourceAmtArray = this.makeResources(prodResources);
        this.updateCosts(ResourceAmtArray);
        //successful event created
        var eventContent = this.model.get('content') + " was successful.";
        this.createEvent(eventContent);
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
	        onComplete: function(){obj.find('.jCProgress').remove();    obj.find('.action-content').removeClass('performing');}
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
      var Action = this;
      var actionPerformed = true;
      $.each(ResourceCosts,function(resourceName, cost){
      // match is the model instance in collection that matches resourceName to check if it is possible
      // to subtract costs without non negative amount. Return a key value pair array of Models 
      //and cost to subtract if all matches.checkSubtract(cost) are true 
        var match = Action.findResource(resourceName);
        if(match.checkSubtract(cost)){
          modelsAndCosts[match.id] = cost;
          }
        else {
          //create event indicating lack of resources to perform action
          var eventContent = "Not enough " + match.get('content');
          Action.createEvent(eventContent);
          actionPerformed = false;}
      });

      if(actionPerformed)
        return modelsAndCosts;
      else return {};
    },

    useResources: function(modelsAndCosts){
      $.each(modelsAndCosts,
        function(modelId,cost){
          var model = ResourceCollection.get(modelId);
          model.subtract(cost);        
        });
    },

    makeResources: function(ResourceAmounts){
      var Action = this;
      var ResourceArray = {};
        if(ResourceAmounts != undefined){
          $.each(ResourceAmounts, function(prodResource, amount){
            var resource = Action.findResource(prodResource);
             if(resource != undefined)
                {Action.updateResource(resource, amount);
                ResourceArray[resource]=resource.get('amount');}
             else
                {Action.createResource(prodResource, amount);
                var eventContent = prodResource + " gained for the first time!";
                Action.createEvent(eventContent);
                var resource = Action.findResource(prodResource);
                ResourceArray[resource]=resource.get('amount');                
                }
          });
        }

    return ResourceArray;
    },

    createEvent: function (eventContent){
       EventCollection.create({content: eventContent, order: EventCollection.nextOrder(), enabled: true});
    },
    
    findResource: function (resourceContent){
      return ResourceCollection.find(function(resource){return resource.get('content') == resourceContent});
    },

    createResource: function(resourceContent,resourceAmt){
      ResourceCollection.create({content: resourceContent, order: ResourceCollection.nextOrder(), enabled: true, amount: resourceAmt})
    },

    updateResource: function(res,amt){
      res.add(amt);      
    },

    updateCosts: function(ResourcesAmtArray){
      if(!this.model.get('staticCost')){
        var TotalAmt = 0;
        $.each(ResourcesAmtArray, function(resource,amt){TotalAmt += amt});
        this.model.changeCost(TotalAmt);
      }
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
        var helper = this.$el.find('.action-helper-top').first();
        helper.fadeIn();
      }
    },
    hideActionHelper: function(){
        var helper = this.$el.find('.action-helper-top').first();
        helper.fadeOut();
    },

    // Remove the item, destroy the model.
    clear: function() {
      this.model.clear();
    }

  });
  return ActionView;
});
