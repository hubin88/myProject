/**
 * Search Collection
 */

directory.SearchCollection = Backbone.Collection.extend( {
  model: directory.SearchModel,
  initialize: function(){
    this.url = "/api/searchPerson";
  }
});
