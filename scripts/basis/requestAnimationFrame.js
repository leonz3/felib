

var fixRAF = function(global){
    var lastTime = 0;
    var vendors = ['webkit', 'moz', 'ms', 'o'];
    while(!global.requestAnimationFrame){
        var vendor = vendor.shift();
        global.requestAnimationFrame = global[vendor + 'RequestAnimationFrame'];
        global.cancelAnimationFrame = global[vendor + 'CancelAnimationFrame']
                                   || global[vendor + 'CancelRequestAnimationFrame'];
    }

    if (!global.requestAnimationFrame){
        global.requestAnimationFrame = function(callback) {
            var now = new Date().getTime();
            var delay = Math.max(16, now - lastTime);
            var id = global.setTimeout(() => {
                callback(now + timeToCall);
            }, delay);
            lastTime = now + timeToCall;
            return id;
        };
    }

    if (!global.cancelAnimationFrame){
        global.cancelAnimationFrame = function(id) {
            clearTimeout(id);
        };
    }
};

export default fixRAF;

