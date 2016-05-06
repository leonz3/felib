//reference 'sass/layer.scss'

var Layer = {
    el: null ,
    style: '',
    auto: 0,
    destroyed: null ,
    isCanIgnore: !0,
    init: function(type, options) {
        if(!this.el){
            this.el = document.createElement('div');
            this.el.innerHTML = '<div class="util-layer-body"></div>';
            document.body.appendChild(this.el);
            this.el.addEventListener('touchmove', function(e) {
                e.preventDefault();
            }, false);
            this.el.addEventListener('click', function(e) {
                var classList = e.target.classList;
                if(classList.contains('util-layer') || classList.contains('util-layer-close')){
                    this.isCanIgnore && this.destroy();
                }
            }.bind(this), false);
            window.addEventListener('resize', function() {
                this.resize();
            }.bind(this));
        }

        this.render(type, options);
        this.bind(options);
        this.resize();
        this.auto = options.auto,
        this.destroyed = options.destroyed,
        this.isCanIgnore = options.isCanIgnore !== false;

    },
    render: function(type, options) {
        var html = '';
        if(options.title){
            html += '<div class="util-layer-title">' + options.title + '</div>';
        }
        if(options.content){
            html += '<div class="util-layer-content">' + options.content + '</div>';
        }
        if(options.buttons && options.buttons.length){
            html += '<div class="util-layer-action">' + options.buttons.map(function(item) {
                return '<a href="javascript:;">' + item.name + '</a>';
            }).join('') + '</div>';
        }
        this.el.className = 'util-layer util-layer-' + type;
        this.el.children[0].innerHTML = html;
        this.el.style.display = 'block';
        setTimeout(function(){
            this.el.classList.add('active');
        }.bind(this), 0);

    },
    bind: function(options) {
        var action = this.el.querySelector('.util-layer-action');
        action && Array.prototype.forEach.call(action.children, function(item, index) {
            item.addEventListener('click', function() {
                return options.buttons[index].handler ? options.buttons[index].handler.call(item, this) : this.destroy();
            }.bind(this));
        }.bind(this));
        options.created && options.created.call(this);
        options.auto && this.destroy(options.auto);
    },
    resize: function() {
        var maxHeight = window.innerHeight;
        if (this.el.classList.contains('util-layer-bench'))
            maxHeight = maxHeight - this.el.querySelector('.util-layer-action').offsetHeight - this.el.querySelector('.util-layer-title').offsetHeight;
        else {
            if (this.el.classList.contains('util-layer-capion')) return;
            maxHeight = .85 * maxHeight - 92;
        }
        this.el.querySelector('.util-layer-content').style.maxHeight = maxHeight + 'px';
    },
    destroy: function(delay) {
        setTimeout(function() {
            this.el.classList.remove('active');
            var time = 1000 * parseFloat(window.getComputedStyle(this.el.querySelector('.util-layer-body'))['-webkit-transition-duration']);
            setTimeout(function() {
                this.el.style.display = 'none';
                this.destroyed && this.destroyed.call(this);
            }.bind(this), time);
        }.bind(this), ~~delay);
    }
};

['dialog', 'bench'].forEach(function(item) {
    Object.defineProperty(Layer, item, {
        get: function() {
            return this.init.bind(this, item)
        }
    });
}),

Object.defineProperty(Layer, 'capion', {
    get: function() {
        var capion = ['success', 'warn'].reduce(function(memo, item) {
            memo[item] = function(msg, auto, callback) {
                this.init('capion', {
                    content: '<i class="util-layer-icon-' + item + '"></i><p>' + msg + '</p>',
                    auto: 'undefined' == typeof auto ? 3000 : auto,
                    destroyed: callback
                });
            }.bind(this);
            return memo;
        }.bind(this), {});
        return capion;
    }
});

export default Layer;


/**

    ## 对话框

        Layer.dialog({
            title: [String],            //标题，可选
            content: [String],          //内容
            buttons: [{                 //按钮，可选，至多2个
                name: [String],         //按钮名称
                handler: [Function]     //按钮事件，可选，默认为弹窗关闭时间。事件参数为弹窗对象
            }[, {..}]?],
            created: [Function],        //弹窗创建时回调，可选
            destroyed: [Function],      //弹窗隐藏时回调，可选
            isCanIgnore: [Boolean],     //是否可隐藏，可选，默认true
            auto: [Int]                 //自动隐藏时间，可选，0时不自动隐藏，默认0
        });

    ## 提示框

        Layer.capion({
            content: [String],          //内容
            created: [Function],        //弹窗创建时回调，可选
            destroyed: [Function],      //弹窗隐藏时回调，可选
            isCanIgnore: [Boolean],     //是否可隐藏，可选，默认true
            auto: [Int]                 //自动隐藏时间，可选，0时不自动隐藏，默认0
        });

    * 成功提示

        Layer.capion.success(content, auto, destroyed);

    * 警告提示

        Layer.capion.warn(content, auto, destroyed);


    ## 上弹弹窗

        Layer.bench({
            title: [String],            //标题，可选
            content: [String],          //内容
            buttons: [{                 //按钮，可选，至多2个
                name: [String],         //按钮名称
                handler: [Function]     //按钮事件，可选，默认为弹窗关闭时间。事件参数为弹窗对象
            }[, {..}]?],
            created: [Function],        //弹窗创建时回调，可选
            destroyed: [Function],      //弹窗隐藏时回调，可选
            isCanIgnore: [Boolean],     //是否可隐藏，可选，默认true
            auto: [Int]                 //自动隐藏时间，可选，0时不自动隐藏，默认0
        });

    ## 隐藏

        Layer.destroy();

 */
