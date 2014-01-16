define(['underscore', 'backbone'], function(_, Backbone) {
  var ResourceModel = Backbone.Model.extend({
    
    Resource: function() { },

  // displayed in resource helper on hover
    ResourceDescription: function() {return "Resource Description"},
    defaults: {
      content: 'empty Resource...',
      enabled: false,
      amount: 0 //how many resources are left
    },

    // Ensure that each Resource created has `content`.
    initialize: function() {
      if (!this.get('content')) {
        this.set({'content': this.defaults.content});
      }
    },

    // Remove this Resource from *localStorage*
    clear: function() {
      this.destroy();
    },
    
    checkSubtract: function(cost){
      if((this.get('amount') - cost) >= 0){return true;}
      else return false; 
    },

    subtract: function(cost){
      var curAmt = this.get('amount');
      this.set('amount', curAmt - cost);
      this.save({amount: curAmt - cost});
    }

  });
  return ResourceModel;
});
