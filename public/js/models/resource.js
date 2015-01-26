define(['underscore', 'backbone','js/models/base'], function(_, Backbone, BaseModel) {
  var ResourceModel = BaseModel.extend({
    Resource: function() { },
    
    defaults: {
      ResourceDescription: "Resource Description",
      content: 'empty Resource...',
      enabled: false,
      amount: 0 //how many resources are left
    },

    checkSubtract: function(cost){
      if((this.get('amount') - cost) >= 0){return true;}
      else return false; 
    },

    subtract: function(cost){
      var curAmt = this.get('amount');
      this.set('amount', curAmt - cost);
      this.save({amount: curAmt - cost});
    },
  
    add: function(amt){
      var curAmt = this.get('amount');
      this.set('amount', curAmt + amt);
      this.save({amount: curAmt + amt});
    }

  });
  return ResourceModel;
});
