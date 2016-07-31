

var isElement = function(el){
	return !!(el && el.nodeType === 1);
};

// where => [beforebegin | afterbegin | beforeend | afterend]
var insertHTML = function(el, html, where) {
	if(typeof where === 'undefined'){
		where = 'beforeend';
	}
	if(el.insertAdjacentHTML){
		el.insertAdjacentHTML(where, html);
	}else{
		var div = document.createElement('div');
		var fragment = document.createDocumentFragment();
		div.innerHTML = html;
		Array.prototype.forEach.call(div.children, function(child){
			fragment.appendChild(child);
		});
		if(where === 'beforeend'){
			el.appendChild(fragment);
		}else if(where === 'afterbegin'){
			el.insertBefore(fragment, el.firstChild);
		}else if(where === 'beforebegin'){
			el.parentNode.insertBefore(fragment, el.firstChild);
		}else{
			el.parentNode.insertBefore(fragment, el.nextElementSibling);
		}
	}
};


export {
	isElement,
	insertHTML
};
