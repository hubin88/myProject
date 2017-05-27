directory.SearchItemView = Backbone.View.extend({

    render:function (data) {
        this.$el.html(this.template(data));
        return this;
    }
});