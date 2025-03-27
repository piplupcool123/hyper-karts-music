let currentTrackIndex = 0;
let originalPlayColor, originalPauseColor, originalRandomColor;
let pressedPlayColor = '#558000';
let pressedPauseColor = '#cc6600';
let pressedRandomColor = '#999900';
let pressedRandomLoopColor = '#ac3973';
let isRandom = false;
let isLoop = false;

var current = [
    { name: "banlandstadium-hoppingicon", file: "./current/banlandstadium-hoppingicon.ogg" },
    { name: "cakevalley-oshawottice", file: "./current/cakevalley-oshawottice.ogg" },
    { name: "citysidelake-oshawottice", file: "./current/citysidelake-oshawottice.ogg" },
    { name: "frogsfactory-oshawottice", file: "./current/frogsfactory-oshawottice.ogg" },
    { name: "glowgloforest-oshawottice", file: "./current/glowgloforest-oshawottice.ogg" },
    { name: "graywaterskyway-oshawottice", file: "./current/graywaterskyway-oshawottice.ogg" },
    { name: "hyperracingcircuit-hoppingicon", file: "./current/hyperracingcircuit-hoppingicon.ogg" },
    { name: "mallofrobloxia-oshawottice", file: "./current/mallofrobloxia-oshawottice.ogg" },
    { name: "nebuladistrict-oshawottice", file: "./current/nebuladistrict-oshawottice.ogg" },
    { name: "northglobe-oshawottice", file: "./current/northglobe-oshawottice.ogg" },
    { name: "shatteredsky-Req_NG", file: "./current/shatteredsky-Req_NG.mp3" },
    { name: "starryspeedway-Req_NG", file: "./current/starryspeedway-Req_NG.ogg" },
    { name: "sunshineharbor-hoppingicon", file: "./current/sunshineharbor-hoppingicon.ogg" },
    { name: "volcanicpowerplant-oshawottice", file: "./current/volcanicpowerplant-oshawottice.ogg" },
    { name: "waterroad-oshawottice", file: "./current/waterroad-oshawottice.ogg" },
];

var old = [
    { name: "shatteredsky-oshawottice", file: "./old/shatteredsky-oshawottice.ogg" },
    { name: "banlandstadium-oshawottice", file: "./old/banlandstadium-oshawottice.ogg" },
    { name: "starryspeedway-oshawottice", file: "./old/starryspeedway-oshawottice.ogg" },
];

var trackName = document.currentScript.getAttribute('data-track');
var tracks = window[trackName];
if (Array.isArray(tracks)) {
    console.log("Found array:", trackName);
} else {
    console.error("Array not found:", trackName);
}


function populateSongList() {
    const songList = document.getElementById('songList');
    tracks.forEach((song, index) => {
        const option = document.createElement('option');
        option.value = index;
        option.textContent = song.name;
        songList.appendChild(option);
    });

    songList.addEventListener('change', function() {
        loadTrack(parseInt(this.value), true);
        document.getElementById('audioPlayer').play();
        updateSongListHighlight();
    });
}

document.getElementById('play').addEventListener('click', function() {
    document.getElementById('audioPlayer').play();
    playButtonColors()
});

document.getElementById('pause').addEventListener('click', function() {
    document.getElementById('audioPlayer').pause();
    pauseButtonColors()
});

document.getElementById('next').addEventListener('click', function() {
    loadTrack(currentTrackIndex + 1, true);
    document.getElementById('audioPlayer').play();
});

document.getElementById('prev').addEventListener('click', function() {
    loadTrack(currentTrackIndex - 1, true);
    document.getElementById('audioPlayer', true).play();
});

document.getElementById('audioPlayer').addEventListener('ended', function() {
    loadTrack(currentTrackIndex + 1);
    document.getElementById('audioPlayer').play();
});

document.getElementById('toggleRandom').addEventListener('click', function() {
    if (isRandom == false && isLoop == false){
        isRandom = true;
        isLoop = false;
        this.children[0].style.backgroundImage = "url('./websiteResources/random.png')";
        this.style.backgroundColor = pressedRandomColor;
    }
    else if (isRandom == true && isLoop == false){
        isRandom = false;
        isLoop = true;
        this.children[0].style.backgroundImage = "url('./websiteResources/loop1.png')";
        this.style.backgroundColor = pressedRandomLoopColor;
    }
    else if (isRandom == false && isLoop == true){
        isRandom = false;
        isLoop = false;
        this.children[0].style.backgroundImage = "url('./websiteResources/random.png')";
        this.style.backgroundColor = originalRandomColor;
    }
    //this.textContent = isRandom ? "Disable Random" : "Toggle Random";
});

function updateProgress() {
    const player = document.getElementById('audioPlayer');
    const progress = document.getElementById('progress');
    const percent = (player.currentTime / player.duration) * 100;
    progress.style.width = percent + '%';
}

function setProgress(event) {
    const player = document.getElementById('audioPlayer');
    const progressContainer = document.getElementById('progress-container');
    const width = progressContainer.clientWidth;
    const clickX = event.offsetX;
    const duration = player.duration;
    
    player.currentTime = (clickX / width) * duration;
}

document.getElementById('audioPlayer').addEventListener('timeupdate', updateProgress);

function loadTrack(index, songSelected, started) {
    
    if(started){}else{
      if(index < 0){
        index = tracks.length-1;
      }
      else if(index > tracks.length-1){
        index = 0;
      }
    }
    


    if (isLoop) {
        if (songSelected){
            index = index;
        }else{
            index = currentTrackIndex;
        }
    } else {
        if (isRandom) {
            do {
                index = Math.floor(Math.random() * tracks.length);
            } while(index === currentTrackIndex);
        } else if (index < 0 || index >= tracks.length) {
            index = 0;
        }
    }
    

    currentTrackIndex = index;
    const player = document.getElementById('audioPlayer');
    player.src = tracks[currentTrackIndex].file;
    document.getElementById('currentTrack').innerText = tracks[currentTrackIndex].name + " " + (index+1).toString()+"/" +(tracks.length).toString();
    updateSongListHighlight();
    restoreButtonColors();
    playButtonColors();

    const downloadLink = document.getElementById('download');
    downloadLink.href = tracks[currentTrackIndex].file;
    downloadLink.download = tracks[currentTrackIndex].name.replace(/\s+/g, '_') + ".ogg";
}

function playButtonColors(){
    document.getElementById('play').style.backgroundColor = pressedPlayColor;
    document.getElementById('pause').style.backgroundColor = originalPauseColor;
}

function pauseButtonColors(){
    document.getElementById('pause').style.backgroundColor = pressedPauseColor;
    document.getElementById('play').style.backgroundColor = originalPlayColor;
}

function restoreButtonColors() {
    const playButton = document.getElementById('play');
    const pauseButton = document.getElementById('pause');
    playButton.style.backgroundColor = originalPlayColor;
    pauseButton.style.backgroundColor = originalPauseColor;
}

function updateSongListHighlight() {
    const songList = document.getElementById('songList');
    for (let option of songList.options) {
        if (parseInt(option.value) === currentTrackIndex) {
            option.classList.add('current-song');
            songList.selectedIndex = option.value
        } else {
            option.classList.remove('current-song');
        }
    }
}

window.onload = function() {
    const playButton = document.getElementById('play');
    const pauseButton = document.getElementById('pause');
    const randomButton = document.getElementById('toggleRandom');
    originalPlayColor = playButton.style.backgroundColor;
    originalPauseColor = pauseButton.style.backgroundColor;
    originalRandomColor = randomButton.style.backgroundColor;

    loadTrack(currentTrackIndex, true, true);
    populateSongList();
    updateSongListHighlight(); 
    
    restoreButtonColors();
    pauseButtonColors();
};