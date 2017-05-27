var directory = {

    views: {},

    models: {},

    loadTemplates: function(views, callback) {

        var deferreds = [];

        $.each(views, function(index, view) {
            if (directory[view]) {
                deferreds.push($.get('tpl/' + view + '.html', function(data) {
                    directory[view].prototype.template = function(tplData) {
                        return _.template(data, tplData);
                    };
                }, 'html'));
            } else {
                alert(view + " not found");
            }
        });

        $.when.apply(null, deferreds).done(callback); // $.when()的方式会等到两个请求都返回之后才触发回调函数
    }

};

directory.Router = Backbone.Router.extend({

    routes: {
        "":                 "home",
        "contact":          "contact",
        "search-result":     "searchResult",
        "employees/:id":     "personDetail"
    },

    initialize: function () {
        directory.shellView = new directory.ShellView();
        $('body').html(directory.shellView.render().el);
        console.log(directory.shellView.el);
        this.$content = $("#content");
    },

    /**
     * 首页
     */
    home: function () {
        // 如果home view没有变化，我们只实例化一次。
        if (!directory.homelView) {
            directory.homelView = new directory.HomeView();
            directory.homelView.render();
        } else {
            console.log('reusing home view');
            directory.homelView.delegateEvents();
        }
        this.$content.html(directory.homelView.el);
        directory.shellView.selectMenuItem('home-menu');
    },

    /**
     * 联系人页面
     */
    contact: function () {
        if (!directory.contactView) {
            directory.contactView = new directory.ContactView();
            directory.contactView.render();
        }
        this.$content.html(directory.contactView.el);
        directory.shellView.selectMenuItem('contact-menu');
    },

    /**
     * 搜索结果页展示
     */
    searchResult: function() {
        if (!directory.searchResultView) {
            directory.searchResultView = new directory.SearchResultView();
            directory.searchResultView.render();
        } else {
            console.log('reusing search result view');
            directory.searchResultView.delegateEvents();
        }
        this.$content.html(directory.searchResultView.el);
        directory.shellView.selectMenuItem('search-result-menu');
    },

    /**
     * 个人信息展示
     */
    personDetail: function(id) {
        var that = this;
        var personInfo = new directory.personInfoModel;
        personInfo.fetch({
            data: {
                id: id
            },
            type: 'post',
            success: that.renderPersonDetail.bind(that),
            fail: function() {
                // todo
            }
        });

    },
    /**
     *  Render When Get Data.
     */
    renderPersonDetail: function(data) {
        if (!directory.personInfoView) {
            directory.personInfoView = new directory.PersonInfoView();
            directory.personInfoView.render(data);
        } else {
            console.log('reusing search result view');
            directory.personInfoView.delegateEvents();
            directory.personInfoView.render(data);
        }
        this.$content.html(directory.personInfoView.el);
        directory.shellView.selectMenuItem('search-result-menu');
    }
});

$(document).on("ready", function () {
    directory.loadTemplates(["HomeView", "ContactView", "ShellView",
            "SearchView", "SearchItemView", "SearchResultView", "PersonInfoView"],
        function () {
            directory.router = new directory.Router();
            Backbone.history.start();
        });
});
