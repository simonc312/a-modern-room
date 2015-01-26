define([
  'underscore', 
  'backbone', 
  'storage', 
  'js/models/event',
  'js/collections/bases'
  ], function(_, Backbone, Store, Event, BasesCollection){

	var EventsCollection = BasesCollection.extend({
    model: Event,

    // Save all of the Event items under the `"Events"` namespace.
    localStorage: new Store('events'),

    reload: function(){
      if(this.length == 0){
        this.create({content: "Welcome back."})
      }
    }

  });
  return new EventsCollection();
});
