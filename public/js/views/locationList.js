//LocationListView takes in collection of locations
define(['jquery','underscore','backbone','js/views/location'], function($,_,Backbone,LocationView) {
  var LocationListView = Backbone.View.extend({ 
    el: '#top-nav',
    tagName: 'ul',

    events: {
      "click #reset" : "clearCollection"
    },

    initialize: function() {
      this.listenTo(this.collection, 'add', this.addOneLocation);
      this.listenTo(this.collection, 'reset', this.render);
      //this.collection.fetch();
    },

    clearModel: function(model){
      model.clear();
    },

    clearCollection: function(){
      this.collection.each(this.clearModel);
    },

    addOneLocation: function(location) {
      var NewLocation = new LocationView({ model: location });
      $(this.el).append(NewLocation.render().el);    
    },
    render: function() {
      var $el = $(this.el)
      , self = this;
      this.collection.each(function(location) {
        self.addOneLocation(location);
  });

  return this;
    },

  });

  return LocationListView;
});
