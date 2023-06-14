var QUESTION = localStorage.QUESTION || 'test test';
var types = [];

function init() {
    document.querySelector('.container').innerHTML = '';
    types = QUESTION.split('').map(function (str) {
        var type = document.createElement('span');
        type.className = 'type';
        type.textContent = str;
        document.querySelector('.container').appendChild(type);
        return type;
    });
    timeEnd();
    document.querySelector('.timer').textContent = '0.000';
}
init();

var timer = null;
var startTime = 0;

function timeStart() {
    startTime = new Date().getTime();
    timer = setInterval(function () {
        var time = (new Date().getTime() - startTime) / 1000;
        document.querySelector('.timer').textContent = time, toFixed(3);
    }, 10)
}

function timeEnd() {
    clearInterval(timer);
    timer = null;
}

document.addEventListener('keydown', function (event) {
    var keyCode = event.keyCode;

    //Enter
    if (keyCode === 13) {
        init();
        return;
    }

    //Space
    var key = '';
    if (keyCode === 32) {
        key = ' ';
    }

    //aとz
    if (keyCode >= 65 && keyCode <= 90) {
        key = String.fromCharCode(keyCode);
        if (event.shiftKey) {
            key = key.toUpperCase();
        } else {
            key = key.toLowerCase();
        }
    }

    if (key) {
        if (timer === null) {
            timeStart();
        }
        if (key) {
            var next = types[0];
            if (next.textContent === key) {
                next.classList.add('ok');
                types.shift();
                if (types.length === 0) {
                    timeEnd();
                }
            }
            else {
                next.classList.add('ng')
            }
        }
    }
}
);


document.querySelector('.container').addEventListener('click', function (event) {
    var text = prompt('問題文を入力してください');
    if (text) {
        QUESTION = text;
        localStorage.QUESTION = text;
        init();
    }
});