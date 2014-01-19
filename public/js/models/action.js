define(['underscore', 'backbone'], function(_, Backbone) {
  var ActionModel = Backbone.Model.extend({
    
    action: function() { },
    eventDescription: function() {return "Event Description"},
    //associated location where action is enabled
    location: "location",
    prodResource: {"resource":1}, //resource produced and amt
    // Default attributes for the todo.
    defaults: {
      content: 'empty Action...',
      enabled: false,
      staticCost: true, //cost doesn't increase 
      timeOutDuration: function(){return 100},  // how long it takes before action can be performed again
      cost: {"Battery Life":0} // some actions will cost more with usage or availablility of resources cost needs to be array of resourceTypes and costs
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
    },
    //adjust cost to how many resources produced by action
    changeCost: function(prodResourceAmt){
      var newCostArray = {};
      $.each(this.get('cost'),
        function(resourceType,cost){newCostArray[resourceType]= cost+prodResourceAmt*5});
      this.set({cost: newCostArray});
      this.save({cost: newCostArray});  
    }

  });
  return ActionModel;
});
