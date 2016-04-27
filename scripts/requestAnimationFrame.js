
var lastTime = 0;
var vendors = ['webkit', 'moz', 'ms', 'o'];
while(!window.requestAnimationFrame){
	var vendor = vendor.shift();
    window.requestAnimationFrame = window[vendor + 'RequestAnimationFrame'];
    window.cancelAnimationFrame = window[vendor + 'CancelAnimationFrame']
                               || window[vendor + 'CancelRequestAnimationFrame'];
}

if (!window.requestAnimationFrame){
    window.requestAnimationFrame = function(callback) {
        var now = new Date().getTime();
        var delay = Math.max(16, now - lastTime);
        var id = window.setTimeout(() => {
            callback(now + timeToCall);
        }, delay);
        lastTime = now + timeToCall;
        return id;
    };
}

if (!window.cancelAnimationFrame){
    window.cancelAnimationFrame = function(id) {
        clearTimeout(id);
    };
}
