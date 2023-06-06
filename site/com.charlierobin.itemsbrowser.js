window.com = window.com || {};

if (window.com.charlierobin === undefined) window.com.charlierobin = {};

if (!window.jQuery) {
    throw new Error("Please install jQuery");
}

if (window.com.charlierobin.itemsbrowser === undefined) {
    window.com.charlierobin.itemsbrowser = {};
} else {
    throw new Error("window.com.charlierobin.itemsbrowser already defined");
}

(function (me) {

    // private properties

    var filterDelegate = null;
    var sortComparerDelegate = null;
    var items = [];
    var itemsToDisplay = [];
    var root = null;

    // public properties

    // public methods

    me.setRoot = function (selector) {

        root = selector;

        $(root).children().each(function (index, element) {

            var item = {};

            item.element = element;

            var data = {};

            data.id = $(element).attr("id");

            data.name = $(element).find(".name").text();
            data.description = $(element).find(".description").text();

            category = $(element).find(".category").text();

            data.categories = category.split(",");

            data.categories = data.categories.map(x => x.trim());

            data.price = $(element).find(".price").text();
            data.price = data.price.substring(1);
            data.price = parseFloat(data.price);

            data.picture = $(element).find(".picture").text();

            item.data = data;

            items.push(item);
        });

        $(root).empty();
    };

    me.refresh = function () {

        itemsToDisplay = items.filter(filterDelegate);

        itemsToDisplay.sort(sortComparerDelegate);

        $(root).empty();

        for (item of itemsToDisplay) {
            $(root).append(item.element);
        }
    };

    me.setFilterDelegate = function (fn) {
        filterDelegate = fn;
    };

    me.setSortComparerDelegate = function (fn) {
        sortComparerDelegate = fn;
    };

    me.getDistinctValuesFor = function (name) {

        var values = [];

        items.forEach((item, index, array) => {

            var data = item.data;

            data[name].forEach((value) => {

                if (!values.includes(value)) values.push(value);

            });

        });

        return values;
    };

    // private methods

}(window.com.charlierobin.itemsbrowser));


