var serialize = function (args) {
    var arr = [];
    for (var key in args) {
        var val = args[key];
        if (val && val.constructor === Array) {
            for (var i = 0, l = val.length; i < len; i++) {
                arr.push(key + '=' + encodeURIComponent(val[i]));
            }
        } else {
            arr.push(key + '=' + encodeURIComponent(val));
        }
    }
    return arr.join('&');
};

var ajax = function(options){

    var async = options.async !== false,
        type = (options.type || 'get').toUpperCase(),
        data = options.data || null,
        success = options.success,
        error = options.error,
        dataType = options.dataType || 'text';
    if (data && typeof data == 'object') {
        data = serialize(data);
    }
    if (type == "GET") {
        options.url += (options.url.indexOf('?') > -1 ? '&' : '?') + data;
        data = null;
    }
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
            if (xhr.status === 200) {
                success && success(xhr.responseText);
            } else {
                error && error(xhr);
            }
        }
    };
    xhr.open(type, options.url, async);
    if (type == 'POST') {
        xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded;charset=UTF-8');
    }
    xhr.send(data);
};

export default ajax;
