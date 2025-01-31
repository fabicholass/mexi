let title = document.getElementById('track')
let volimg = document.getElementById('volimg');
let colume = document.getElementById('con lumen');
let time = document.getElementById('time');

var localStorage = Window.localStorage;

const initArr = {volume: 1, time: 0, song: 0, paused: false};

function comprobarQueTodoEsteBien() {
    var audiovars = localStorage.getItem('audiovars');
    if (audiovars == null) return true;

    var tio = JSON.parse(audiovars);

    var initArrKeys = [];
    for (const key in initArr) initArrKeys.push(key);

    var tioKeys = [];
    for (const key in tio) tioKeys.push(key);

    //nose si esto sea best o peor

    if (initArrKeys.length != tioKeys.length) return true;

    for (let i=0;i<Math.max(initArrKeys.length, tioKeys.length);i++) {
        if (initArrKeys[i] != tioKeys[i]) return true;
    }

    return false;
}
console.log(comprobarQueTodoEsteBien());

if (comprobarQueTodoEsteBien()) localStorage.setItem('audiovars', JSON.stringify(initArr));

function setAudioVar(variable, set) {
    var curVars = JSON.parse(localStorage.getItem('audiovars'));
    curVars[variable] = set;
    localStorage.setItem('audiovars', JSON.stringify(curVars));
}

function getAudioVar(variable) {
    var curVars = JSON.parse(localStorage.getItem('audiovars'));
    return curVars[variable];
}

      // el track inisial va a ser el que este primero en el array
let musicList = ['monowebssite', 'tipiwebsite', 'manzawebsite', 'ktbwebsite'];
var curTrack = 0;

var audio = document.createElement('audio');
audio.type = 'audio/ogg';
audio.autoplay = true;
changeTrack(getAudioVar('song'));
document.body.appendChild(audio);
audio.currentTime = getAudioVar('time');//viste eeso

audio.onended = function() {
    changeTrack(1);
}

var paused = false;

let pauseButton = document.getElementById('pause');
pauseButton.onclick = function() {
  paused = !paused;
  pauseButton.src = paused ? 'img/pause.png' : 'img/play.png';

  paused ? audio.pause() : audio.play();

  setAudioVar('paused', paused);
};

// nose de que manera aser esta parte boy aser la q se me ocure nomas

if (getAudioVar('paused')) {
    paused = true;
    audio.pause();
    pauseButton.src ='img/pause.png';
}

window.addEventListener('beforeunload', function() {
    setAudioVar('time', audio.currentTime);
    setAudioVar('song', curTrack);
});

const averaverquepaso = function() {
    var curImg = Math.ceil(colume.value/100 * 2);
    volimg.src = 'img/'+['volume-x', 'volume-low', 'volume-high'][curImg]+'.png';

    audio.volume = (colume.value / 100);
}

colume.addEventListener('input', averaverquepaso);

colume.addEventListener('change', function() {
    setAudioVar('volume', audio.volume);
});

var noMobiendo = true;

time.addEventListener('input', function () {
  noMobiendo = false;
});

time.addEventListener('change', function () {
  audio.currentTime = (time.value / 100) * audio.duration;
  noMobiendo = true;
});

audio.onloadstart = function() {
  audio.ontimeupdate = function() {};
  time.value = 0;

  colume.value = getAudioVar('volume') * 100;
  averaverquepaso();
}

var durasionTotal = 0;

audio.onloadeddata = function() {
  audio.ontimeupdate = function() {
    if (noMobiendo) time.value = (audio.currentTime / audio.duration) * 100;
  };

  durasionTotal = audio.duration;
}

let skip = document.getElementById('skipf');
skip.onclick = function() {
  changeTrack(1);
};

let back = document.getElementById('skipb');
back.onclick = function() {
  if (audio.currentTime < 2) changeTrack(-1);
  else audio.currentTime = 0;
};

function changeTrack(num) {
  curTrack = curTrack + num;

  if (curTrack > musicList.length-1) curTrack = 0;
  else if (curTrack < 0) curTrack = musicList.length - 1;

  setTrack(curTrack);
}

function setTrack(num) {
    curTrack = num;

    num = bound(num, 0, musicList.length-1);

    audio.src = 'tracks/'+musicList[num]+'.ogg';
    title.textContent = musicList[num].replaceAll('-', ' ');
  
    time.value = 0;
}

var tuti = 0;

function goodle() {
    document.getElementById('curtime').textContent = formatTime(audio.currentTime);
    tuti = lerp(tuti, durasionTotal, bound(0.02, 0, 1));
    document.getElementById('duracion').textContent = formatTime(tuti);

    requestAnimationFrame(goodle);
}

goodle();

function formatTime(sec) {
    var minutos = Math.floor(sec/60);
    return (minutos) + ':' + cerizer(Math.floor(sec%60), 2);
}

function cerizer(num, ceros) {
    var eros = '';
      
    for (var i=0;i<(ceros-num.toString().length);i++) eros += '0';

    return eros + num.toString();
}

function lerp ( a, b, alpha ) {
    return a + alpha * ( b - a );
}

function bound(x, min, max) {
    return Math.max(Math.min(x, max), min);
};