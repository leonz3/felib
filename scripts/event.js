

var on = function(type, handler){
    
};

var off = function(){

};

var trigger = function(){

};



// var Events = {
// 	HTML: {
// 		events: ['click', 'dblclick', 'change', 'scroll'],
// 		init: 'initEvent'
// 	},
// 	Mouse: {
// 		events: [''],
// 		init: 'iniMouseEvent'
// 	},
// 	UI: {
// 		events: ['load', 'unload'],
// 		init: 'iniUIEvent'
// 	}
// };

// var getEventType = function(type){
// 	for(var i in Events){
// 		if(Events[i]['events'].indexOf(type) !== -1){
// 			return i;
// 		}
// 	}
// };

// trigger = function(elem, type){
// 	var type = getEventType(type);
// 	var ev = document.createEvent(type + 'Events');
// 	ev[Events[type]['init']](type, false, true);
// 	elem.dispatchEvent(ev);
// };

export {
    on,
    off,
    trigger
}