

//日期格式化
var format = function (date, str) {
	var f = function(k, v){
		return new Array(k.length - String(v).length + 1).join(0) + v;
	};
	var p = {
		yyyy: { m: 'getFullYear', h: f},
		MM: { m: 'getMonth', h: function(k, v){
			return f(k, v + 1);
		}},
		dd: { m:'getDay', h: f},
		hh: { m:'getHours', h: f},
		mm: { m:'getMinutes', h: f},
		ss: { m:'getSeconds', h: f},
		SSS: { m:'getMilliseconds', h: f}
	};
	return str.replace(/(y+|M+|d+|h+|m+|s+|S+)/g, function(m, $1){
		return p[$1].h($1, date[p[$1].m]());
	});
};

export {
	format
};
