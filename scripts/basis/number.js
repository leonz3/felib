
//生成随机数
var random = function(min, max){
	return Math.floor(Math.random() * (max - min) + min);
};

export {
	random
};
