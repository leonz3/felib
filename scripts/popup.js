/*

### 公共配置选项

    content         //弹窗内容
    auto            //自动关闭时间, 0则不自动关闭
    created         //弹窗创建时回调
    destory         //弹窗隐藏时回调
    isCanIgnore     //是否可忽略

### 对话框

    window.dialog.show({
        title: '  ',
        buttons: [{
            txt: 'button name', handler: function(){

            }
        }, { .. }]
    });

### 上弹框

    window.bench.show({
        content: ' '
        buttons: [{
            txt: 'button name', handler: function(){

            }
        }, { .. }]
    });

### 提示框

    window.capion.show({
        content: ' '
        ..
    });
    window.capion.sucess(message, auto, callback)   //成功提示
    window.capion.warn(message, auto, callback)     //警告
    window.capion.loading(message, auto, callback)  //loading

### 隐藏

    window.xx.hide();
    //window.UtilPopupBase.hide();

 */

~function (global) {

    Array.prototype.slice.call(arguments, 1).forEach(function (fn) {
        fn.call(global);
    });

}(this, function () {

    var empty = function () { /* empty function */ };

    var merge = function (x, y) {
        var fn = function (t, s) {
            for (var k in s) { t[k] = s[k]; }
            return t;
        };
        return fn(fn({}, x), y);
    };

    var defaults = {
        auto: 0,
        isCanIgnore: true,
        created: empty,
        destory: empty,
        content: ''
    };

    var Popup = {
        el: null,
        style: '',          // dialog | bench | capion
        auto: 0,
        destory: empty,
        isCanIgnore: true,
        pageScrollTop: 0,
        init: function (opts) {
            if (!this.el) {
                this.el = document.createElement('div');
                this.el.className = 'util-popup util-popup-';
                this.el.innerHTML = '<div class="util-popup-mask"></div><div class="util-popup-body"></div>';
                document.body.appendChild(this.el);
                this.el.addEventListener('touchmove', function (e) {
                    if (e.target.className === 'util-popup-mask') {
                        e.preventDefault();
                    }
                }, false);
                this.el.addEventListener('click', function (e) {
                    if (e.target.className === 'util-popup-mask') {
                        if (this.isCanIgnore) return this.hide();
                    } else if (/util-popup-close/.test(e.target.className)) {
                        return this.hide();
                    }
                }.bind(this), false);
            }

            var html = '';
            if (opts.title) {
                html += '<div class="util-popup-title">' + opts.title + '</div>';
            }
            if (opts.content) {
                html += '<div class="util-popup-content">' + opts.content + '</div>';
            }
            if (opts.buttons && opts.buttons.length > 0) {
                html += '<div class="util-popup-action">';
                opts.buttons.forEach(function (item) {
                    html += '<a href="javascript:;">' + item.txt + '</a>';
                });
                html += '</div>';
            }

            if (this.el.querySelector('.util-popup-body').innerHTML === html) return;

            this.el.className = this.el.className.replace(/util-popup-([a-z]*)/, 'util-popup-' + this.style);
            this.el.querySelector('.util-popup-body').innerHTML = html;

            var action = this.el.querySelector('.util-popup-action');
            action && Array.prototype.slice.call(action.children).forEach(function (item, index) {
                item.addEventListener('click', function () {
                    return opts.buttons[index].handler == null ? this.hide() : opts.buttons[index].handler.call(item, this);
                }.bind(this), false);
            }.bind(this));

            this.auto = opts.auto;
            this.destory = opts.destory;
            this.isCanIgnore = opts.isCanIgnore;

            opts.created.call(this);
        },
        resize: function(){
            var maxHeight = window.innerHeight;
            if(this.style === 'dialog'){
                maxHeight = maxHeight * 0.85 - 92;
            }else if(this.style === 'bench'){
                maxHeight = maxHeight - 40 * this.el.querySelectorAll('.util-popup-action a').length;
            }else{
                return;
            }
            this.el.querySelector('.util-popup-content').style.maxHeight = maxHeight + 'px';
        },
        show: function (opts) {
            if (opts) {
                var options = merge(defaults, opts);
                this.init(options);
            }
            if (!this.el) return;
            this.el.style.display = 'block';
            this.pageScrollTop = document.body.scrollTop;
            this.resize();
            setTimeout(function () {
                this.el.className += ' active';
            }.bind(this), 0)
            document.body.style.position = 'fixed';
            this.auto && this.hide(this.auto);
        },
        hide: function (delay) {
            setTimeout(function () {
                this.el.className = this.el.className.replace(' active', '');
                var time = parseFloat(window.getComputedStyle(this.el.querySelector('.util-popup-body'))['-webkit-transition-duration']) * 1000;
                setTimeout(function () {
                    this.el.style.display = 'none';
                    document.body.style.position = 'initial';
                    document.body.scrollTop = this.pageScrollTop;
                    this.destory.call(this);
                }.bind(this), time);
            }.bind(this), ~~delay);
        }
    };

    this.UtilPopupBase = Popup;

    ['dialog', 'bench', 'capion'].forEach(function (item) {
        Object.defineProperty(window, item, {
            get: function () {
                this.UtilPopupBase.style = item;
                return this.UtilPopupBase;
            }
        });
    });

}, function () {

    var html = {
        loading: function(){
            var spinner = '<div class="util-spinner">',
                circle = '<div class="util-circle1"></div><div class="util-circle2"></div><div class="util-circle3"></div><div class="util-circle4"></div>',
                i = 1;
            while(i <= 3){
                spinner += '<div class="util-spinner-container util-container' + i + '">' + circle + '</div>';
                i++;
            }
            spinner += '</div>';
            return spinner;
        }(),
        success: '<i class="icon-success"></i>',
        warn: '<i class="icon-warn"></i>'
    };

    ['success', 'warn', 'loading'].forEach(function (item) {
        Object.defineProperty(window.capion, item, {
            get: function () {
                return function (msg, auto, cb) {
                    this.show({
                        content: html[item] + '<div>' + msg + '</div>',
                        auto: typeof auto === 'undefined'? 2500: auto,
                        destory: function () { cb && cb(); }
                    });
                };
            }
        });
    });

});
