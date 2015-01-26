//LocationListView takes in collection of locations
define(['jquery','underscore','backbone','js/views/location','js/collections/actions'], function($,_,Backbone,LocationView,ActionCollection) {
  var LocationListView = Backbone.View.extend({ 
    el: '#top-nav',
    tagName: 'ul',

      events: {
      "click #reset": "clearCollection"
    },

    initialize: function() {
      this.listenTo(this.collection, 'add', this.addOneLocation);
      this.listenTo(this.collection, 'add', this.addOneActionList);
      this.listenTo(this.collection, 'reset', this.render);
      this.collection.fetch();
      ActionCollection.fetch();
    },

    addOneLocation: function(location) {
      var NewLocation = new LocationView({ model: location });
      $(this.el).append(NewLocation.render().el);    
    },

    addOneActionList: function(location){
        $('#action-list').append($('<div id=' + location.get('content') + '></div>'));    
    },

    clearCollection: function(){
      var model;
      while (model = this.collection.first()) {
        model.destroy();
      }
      //$('#action-list').empty();
      this.collection.reload();
    },
    render: function() {
      var self = this;
      this.collection.each(function(location) {
        self.addOneLocation(location);
        self.addOneActionList(location);
      });

  return this;
    },

  });

  return LocationListView;
});
