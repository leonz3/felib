~function(){
    var swipe = document.querySelector('.swipe');
    var length = swipe.querySelectorAll('img').length;
    var cursor = document.createElement('div');
    cursor.classList.add('swipe-cursor');
    cursor.innerHTML = '<ul><li class="active">' + new Array(length).join('</li><li>') + '</li></ul>';
    swipe.appendChild(cursor);
    new Swipe(swipe, {
        auto: 2500,
        continuous: true,
        callback: function(i) {
            swipe.querySelector('.active').classList.remove('active');
            swipe.querySelectorAll('li')[2 === length ? i % 2 : i].classList.add('active');
        }
    });
}();