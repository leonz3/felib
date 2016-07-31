
//queryString(key1[, key2...])
var queryString = function (keys) {
    var searchString = location.search.subString(1);
    var result = Array.prototype.reduce.call(arguments, function (res, item) {
        var regexp = new RegExp('(?:\\?|&)' + item + '=([\\w\-]+)(?:&|$)');
        var matched = searchString.match(regexp);
        res[item] = matched ? matched[1] : '';
        return res;
    }, {});
    return result;
};

export {
    queryString
}
