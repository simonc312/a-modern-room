//LocationListView takes in collection of locations
define(['jquery','underscore','backbone','js/views/location'], function($,_,Backbone,LocationView) {
  var LocationListView = Backbone.View.extend({ 
    el: '#top-nav',
    tagName: 'ul',

    events: {
    },

    initialize: function() {
      this.listenTo(this.collection, 'add', this.render);
      this.listenTo(this.collection, 'reset', this.render);
      //this.collection.fetch();
    },

    render: function() {
      var $el = $(this.el)
      , self = this;
      this.collection.each(function(location) {
      var item, sidebarItem;
      item = new LocationView({ model: location });
      $el.append(item.render().el);
  });

  return this;
    },

  });

  return LocationListView;
});
