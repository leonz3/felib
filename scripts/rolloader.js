
var Rolloader = function(options) {
    this.el = options.el;
    this.url = options.url;
    this.tmpl = options.tmpl;
    this.page = 1;
    this.isFetching = false;
    this.isFetchedDone = false;
    this.run();
};
Rolloader.prototype.run = function() {
    var loader = document.createElement('div');
    var style = {textAlign: 'center', fontSize: '12px', color: '#999', lineHeight: '30px', marginTop: '5px'};
    for (var i in style){
        loader.style[i] = style[i];
    }
    this.el.appendChild(loader);
    var view_height = window.innerHeight;
    document.addEventListener('scroll', function() {
        if(this.isFetching || this.isFetchedDone) return;
        if(document.body.scrollTop + window.innerHeight + 50 >= loader.offsetTop){
            loader.innerHTML = '加载中...';
            this.fetch();
        }
    }.bind(this));
},
Rolloader.prototype.fetch = function() {
    this.isFetching = true,
    ajax({
        url: this.url,
        data: { page: this.page + 1 },
        success: this.append.bind(this),
        error: function() {
            this.isFetching = !1;
            this.el.lastElementChild.innerHTML = '加载失败...';
        }.bind(this)
    });
},
Rolloader.prototype.append = function(data) {
    data = JSON.parse(data);
    if(data.length === 0){
        this.isFetchedDone = true;
        this.el.lastElementChild.innerHTML = '已无更多数据...';
        return;
    }
    var tmpl = this.tmpl;
    var regexp = /\{\{([\w\-]+)\}\}/g;
    var html = data.map(function(item) {
        return tmpl.replace(regexp, function(m, $1) {
            return item[$1];
        });
    }).join('');
    this.el.lastElementChild.insertAdjacentHTML('beforebegin', html);
    this.page += 1;
    this.isFetching = false;
};

export default Rolloader;
