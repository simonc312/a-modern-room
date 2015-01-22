define([
  'jquery',
  'underscore', 
  'backbone',
  'js/views/action',
  'js/views/resource',
  'js/views/event',
  'js/views/locationList',
  'js/collections/actions',
  'js/collections/resources',
  'js/collections/events',
  'js/collections/locations',
  'text!templates/stats.html'
  ], function($, _, Backbone, ActionView, ResourceView, EventView, LocationListView, ActionsCollection, ResourceCollection, EventCollection, LocationCollection, statsTemplate){
  var AppView = Backbone.View.extend({

    // Instead of generating a new element, bind to the existing skeleton of
    // the App already present in the HTML.

    id: 'main',
    tagName: 'div',
    className: 'container-fluid',
    el: $('#todoapp'),

    // Our template for the line of statistics at the bottom of the app.
    statsTemplate: _.template(statsTemplate),

    // Delegated events for creating new items, and clearing completed ones.
    events: {
      "click #reset": "clearCollections"
    },

    // At initialization we listen to the relevant events in
    // collections, when items are added or changed. This collection is
    // passed on the constructor of this AppView. Kick things off by
    // loading any preexisting objects that might be saved in *localStorage*.
    initialize: function() {

      this.listenTo(ActionsCollection, 'add', this.addOneAction);
      this.listenTo(ResourceCollection, 'add', this.addOneResource);
      this.listenTo(EventCollection, 'add', this.addOneEvent);
      this.listenTo(EventCollection, 'change', this.clearOldEvent);
      this.listenTo(this.collection, 'reset', this.addAll);
      this.listenTo(ActionsCollection, 'reset', this.addAllActions);
      this.listenTo(ResourceCollection, 'reset', this.addAllResources);
      ActionsCollection.fetch();
      ResourceCollection.fetch();
    },

    addOneAction: function(action) {
      var view = new ActionView({model: action});
      var actionDivClass = action.get('location');
      $.elementReady(actionDivClass,function(){$('#'+actionDivClass).append(view.render().el);});
    },
    addOneResource: function(resource) {
      var view = new ResourceView({model: resource});
      this.$('ul#right-nav').append(view.render().el);
    },
    addOneEvent: function(event){
      var view = new EventView({model: event});
      this.$('ul#left-nav').prepend(view.render().el);
    },

    addAllActions: function(){ActionsCollection.each(this.addOneAction);},

    addAllResources: function(){ResourceCollection.each(this.addOneResource);},

    clearOldEvent: function() {
      if(EventCollection.size() > 10)
        EventCollection.first().clear();
      return false;
    },

    clearCollection: function(collection){
    var model;
    while (model = collection.first()) {
      model.destroy();
    }
    collection.reload();
    },

    clearCollections: function(){
      this.clearCollection(ActionsCollection);
      this.clearCollection(ResourceCollection);
      this.clearCollection(EventCollection);
      this.clearCollection(LocationCollection);
    }



  });
  return AppView;
});
