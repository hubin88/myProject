
directory.ShellView = Backbone.View.extend({

    initialize: function () {
        this.searchView = new directory.SearchView({tagName: 'ul', className: 'dropdown-menu'});
    },

    render: function () {
        this.$el.html(this.template());
        $('body').click(function () {
            $('.dropdown').removeClass("open");
        });
        this.$el.find('.navbar-search').append(this.searchView.el);
        return this;
    },

    events: {
        "keyup .search-query": "search",
        "keypress .search-query": "onkeypress"
    },

    search: function (event) {
        var that = this;
        // search
        var target = $(event.target);
        var keyWords = target.val();

        var searchModel = new directory.SearchModel;
        searchModel.fetch({
            data: {
                searchValue: keyWords
            },
            success: function(data) {
                data.attributes.persons = getArrayItems(data.attributes.persons, 6);
                that.searchView.$el.html(that.searchView.template(data.attributes));

                $('.dropdown').addClass('open');
            },
            error: function() {
                // handle error.
                $('.dropdown').removeClass('open');
            }
        });
    },

    onkeypress: function (event) {
        if (event.keyCode === 13) { // enter key pressed
            event.preventDefault();
        }
    },

    selectMenuItem: function(menuItem) {
        $('.navbar .nav li').removeClass('active');
        if (menuItem) {
            $('.' + menuItem).addClass('active');
        }
    }

});

// helpers
// 从数组arr中随机取出不重复的num个值

function getArrayItems(arr, num) {
    var temp_array = new Array();
    for (var index in arr) {
        temp_array.push(arr[index]);
    }
    var return_array = new Array();
    for (var i = 0; i<num; i++) {
        if (temp_array.length>0) {
            var arrIndex = Math.floor(Math.random()*temp_array.length);
            return_array[i] = temp_array[arrIndex];
            temp_array.splice(arrIndex, 1);
        } else {
            break;
        }
    }
    return return_array;
}
