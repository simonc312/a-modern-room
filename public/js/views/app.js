define([
  'jquery',
  'underscore', 
  'backbone',
  'js/views/todo',
  'js/views/action',
  'js/views/resource',
  'js/views/event',
  'js/views/locationList',
  'js/collections/actions',
  'js/collections/resources',
  'js/collections/events',
  'text!templates/stats.html'
  ], function($, _, Backbone, TodoView, ActionView, ResourceView, EventView, LocationListView, ActionsCollection, ResourceCollection, EventCollection, statsTemplate){
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
      "keypress #new-todo":  "createOnEnter",
      "click #reset": "clearCollections"
    },

    // At initialization we listen to the relevant events on the `Todos`
    // collection, when items are added or changed. This collection is
    // passed on the constructor of this AppView. Kick things off by
    // loading any preexisting todos that might be saved in *localStorage*.
    initialize: function() {
      this.input    = this.$("#new-todo");

      this.listenTo(this.collection, 'add', this.addOne);
      this.listenTo(ActionsCollection, 'add', this.addOneAction);
      this.listenTo(ResourceCollection, 'add', this.addOneResource);
      this.listenTo(EventCollection, 'add', this.addOneEvent);
      this.listenTo(EventCollection, 'change', this.clearOldEvent);
      this.listenTo(this.collection, 'reset', this.addAll);
      this.listenTo(ActionsCollection, 'reset', this.addAllActions);
      this.listenTo(ResourceCollection, 'reset', this.addAllResources);

      this.collection.fetch();
      ActionsCollection.fetch();
      ResourceCollection.fetch();
    },

    // Re-rendering the App just means refreshing the statistics -- the rest
    // of the app doesn't change.
    render: function() {
      var done = this.collection.done().length;
     // this.$('#todo-stats').html(this.statsTemplate({
     //   total:      this.collection.length,
     //   done:       this.collection.done().length,
     //   remaining:  this.collection.remaining().length,
     // }));
    },

    // Add a single todo item to the list by creating a view for it, and
    // appending its element to the `<ul>`.
    addOne: function(todo) {
      var view = new TodoView({model: todo});
      this.$('#todo-list').append(view.render().el);
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
    // Add all items in the **Todos** collection at once.
    addAll: function() {
       this.collection.each(this.addOne);
    },

    addAllActions: function(){ActionsCollection.each(this.addOneAction);},

    addAllResources: function(){ResourceCollection.each(this.addOneResource);},

    // Generate the attributes for a new Todo item.
    newAttributes: function() {
      return {
        content: this.input.val(),
        order:   this.collection.nextOrder(),
        done:    false
      };
    },

    // If you hit return in the main input field, create new **Todo** model,
    // persisting it to *localStorage*.
    createOnEnter: function(e) {
      if (e.keyCode != 13) return;
      this.collection.create(this.newAttributes());
      this.input.val('');
    },


    clearOldEvent: function() {
      if(EventCollection.size() > 10)
        EventCollection.first().clear();
      return false;
    },

    clearModel: function(model){
      model.clear();
    },

    clearCollections: function(){
      ActionsCollection.each(this.clearModel);
      ResourceCollection.each(this.clearModel);
      EventCollection.each(this.clearModel);
      
    }



  });
  return AppView;
});
