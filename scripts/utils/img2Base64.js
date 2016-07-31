
var img2Base64 = function(src, callback) {
	var img = new Image(),
		canvas = document.createElement('canvas'),
		context = canvas.getContext('2d');
	img.onload = function(){
		canvas.width = img.width;
		canvas.height = img.height;
		context.drawImage(img, 0 , 0);
		callback && callback.call(null, canvas.toDataURL("image/png"));
	};
	img.src = src;
};

export default img2Base64;
