directory.SearchResultView = Backbone.View.extend({
    initialize: function() {
      this.searchCollection = new directory.SearchCollection;

      this.searchCollection.bind( "add", this.addSearchOne );
      this.searchCollection.bind( "reset", this.addAllSearch.bind(this));

    },
    render:function () {
        this.$el.html(this.template());
        return this;
    },
    events: {
      'submit .search-form': 'searchForm'
    },

    searchForm: function(e) {
      var target = $(e.target);
      var value = target.find('.search-input').val();

      this.searchCollection.fetch({
        reset: true,
        data: {
          value: value
        },
        success: function() {
          // success callback
        },
        fail: function() {
          // todo fail
        }
      });
    },

    addSearchOne: function(searchModel) {
      var searchItemView = new directory.SearchItemView();
      searchItemView.render(searchModel.toJSON());
      this.$el.find('.search-content').append(searchItemView.el);
    },

    addAllSearch: function() {
      this.$el.find('.search-content').empty();
      this.searchCollection.each(this.addSearchOne.bind(this));
    }

});

