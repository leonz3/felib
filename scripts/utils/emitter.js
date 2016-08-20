
var it = function(a) {
    var type = typeof a;
    return {
        isUndefined: type === 'undefined',
        isString: type === 'string',
        isFunction: type === 'function',
        isArray: a instanceof Array
    };
};

var emitter = {
    listeners: {},

    /**
     * 监听事件
     * @param {string} name
     */
    on: function(name, listener) {
        if (!it(name).isString || !it(listener).isFunction) {
            throw new Error('[emitter]: arguments of emitter.on is error');
        }
        if (!this.listeners[name]) {
            this.listeners[name] = [];
        }
        this.listeners[name].push(listener);
        console.log('[emitter]: emitter add listener named "' + name + '"');
    },

    /**
     * 监听事件（一次性）
     * @param {string} name
     * @param {function} listener
     */
    once: function(name, listener) {
        var listeners = this.listeners;
        var index = listeners[name] ? listeners[name].length : 0;
        this.on(name, function() {
            listener.apply(this, Array.prototype.slice.call(arguments));
            listeners[name].splice(index, 1);
        });
    },

    /**
     * 删除事件监听
     */
    off: function(name) {
        var nameType = it(name);
        if (nameType.isUndefined) {
            this.listeners = {};
            console.log('[emitter]: emitter listener all clear');
        } else {
            if (nameType.isString) {
                name = name.split(/\s+/);
            }
            name.forEach(function(item) {
                this.listeners[item] = [];
            }, this);
            console.log('[emitter]: emitter listener named "' + name.join(',') + '] clear');
        }

    },

    /**
     * 触发事件
     * @example  Emitter.emit('item-clicked', {id: 1}, this)
     */
    emit: function(name) {
        if (it(name).isUndefined) {
            throw new Error('[emitter]: arguments of emitter.emit is error');
        }
        if (!this.listeners[name]) {
            console.log('[emitter]: no listener named "' + name + '" on emitter');
            return;
        }
        var args = arguments,
            params = [],
            context = null,
            argsLength = args.length;
        if (argsLength === 2) {
            params = Array.prototype.slice.call(args, 1);
        } else if (argsLength >= 3) {
            params = Array.prototype.slice.call(args, 1, argsLength - 1);
            context = args[argsLength - 1];
        }
        console.log('[emitter]: emitter listener named "' + name + '" is emitted, arguments is ' + JSON.stringify(params));
        this.listeners[name].forEach(function(fn) {
            fn.apply(context, params);
        });
    }

};

export default emitter;
