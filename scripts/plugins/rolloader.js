/**
 * 下拉加载
 */

var Rolloader = function(options) {
    this.el = options.el;           //加载列表容器
    this.url = options.url;         //请求url
    this.tmpl = options.tmpl;       //列表项模板
    this.page = 1;
    this.isFetching = false;
    this.isFetchedDone = false;
    this.filter = options.filter || function (data) { return data; };       //返回数据过滤
    this.run();
};

Rolloader.prototype = {
    run: function(){
        var loader = document.createElement('div');
        loader.style.cssText = 'text-align:center; font-size:12px; color: #999; line-height: 30px; margin-top: 5px;';
        this.el.appendChild(loader);
        document.addEventListener('scroll', function() {
            if(this.isFetching || this.isFetchedDone) return;
            if(document.body.scrollTop + window.innerHeight + 50 >= loader.offsetTop){
                loader.innerHTML = '加载中...';
                this.fetch();
            }
        }.bind(this));
    },
    fetch: function(){
        this.isFetching = true,
        ajax({
            url: this.url,
            data: { page: this.page + 1 },
            success: this.append.bind(this),
            error: function() {
                this.isFetching = false;
                this.el.lastElementChild.innerHTML = '加载失败...';
            }.bind(this)
        });
    },
    append: function(data){
        data = JSON.parse(data);
        if(data.length === 0){
            this.isFetchedDone = true;
            this.el.lastElementChild.innerHTML = '已无更多数据...';
            return;
        }
        var tmpl = this.tmpl;
        var filter = this.filter;
        var regexp = /\{\{([\w\-]+)\}\}/g;
        var html = data.map(function(item) {
            item = filter[item];
            return tmpl.replace(regexp, function(m, $1) {
                return item[$1];
            });
        }).join('');
        this.el.lastElementChild.insertAdjacentHTML('beforebegin', html);
        this.page += 1;
        this.isFetching = false;
    }
};

export default Rolloader;
