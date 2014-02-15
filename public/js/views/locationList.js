//LocationListView takes in collection of locations
define(['jquery','underscore','backbone','js/views/location'], function($,_,Backbone,LocationView) {
  var LocationListView = Backbone.View.extend({ 
    el: '#top-nav',
    tagName: 'ul',

    events: {
      
    },

    initialize: function() {
      this.listenTo(this.collection, 'add', this.addOneLocation);
      this.listenTo(this.collection, 'add', this.addOneActionList);
      this.listenTo(this.collection, 'reset', this.render);
      //this.collection.fetch();
    },



    addOneLocation: function(location) {
      var NewLocation = new LocationView({ model: location });
      $(this.el).append(NewLocation.render().el);    
    },

    addOneActionList: function(location){
      $('#action-list').append($('<div id=' + location.get('content') + '></div>'));    
    },
    render: function() {
      var $el = $(this.el)
      , self = this;
      this.collection.each(function(location) {
        self.addOneLocation(location);
        self.addOneActionList(location);
      });

  return this;
    },

  });

  return LocationListView;
});
