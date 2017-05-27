directory.PersonInfoView = Backbone.View.extend({

    render:function (data) {
        this.$el.html(this.template(data.attributes));
        return this;
    }

});