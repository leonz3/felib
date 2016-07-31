
Array.prototype.includes = Array.prototype.includes || function(item){
	return !!~this.indexOf(item);
};

var isArray = Array.isArray || function (obj) {
	return toString.call(obj) === '[object Array]';
};

//数组合并，排除相同
var merge = function(a, b){
	var result = [];
	var len = Math.max(a.length, b.length);
	var includes = this.includes;
	for (var i = 0; i < len; i++) {
		var val1 = a[i],
			val2 = b[i];
		if (val1 && result.indexOf(val1) === -1) {
			result.push(val1);
		}
		if (val2 && result.indexOf(val2) === -1) {
			result.push(val2);
		}
	}
	return result;
};

//随机排列
var shuffle = function(){
	var arr = [].concat.apply([], arguments);
	for(var i = 0, l = arr.length; i < l; i ++){
		var idx = Math.floor(Math.random() * (l - i));
		var temp = arr[idx];
		arr[idx] = arr[l - i - 1];
		arr[l - i - 1] = temp;
	}
	return arr;
};


export {
	isArray,
	suffle
};
