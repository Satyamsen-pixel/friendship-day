/* ==========================================================
   FRIENDSHIP DAY
   Premium Interactive Experience
   ========================================================== */

"use strict";

/* ==========================================================
   DOM ELEMENTS
   ========================================================== */

const loader = document.getElementById("loader");

const sceneTitle = document.getElementById("sceneTitle");
const typewriter = document.getElementById("typewriter");

const prevSceneBtn = document.getElementById("prevScene");
const nextSceneBtn = document.getElementById("nextScene");

const replayBtn = document.getElementById("replay");

const indicator = document.getElementById("sceneIndicator");

const clickHint = document.getElementById("clickHint");

const playButton = document.getElementById("playMusic");

const audio = document.getElementById("bgMusic");

const progress = document.getElementById("progress");

const volume = document.getElementById("volume");

const currentTime = document.getElementById("currentTime");

const duration = document.getElementById("duration");

const visualizer = document.querySelectorAll(".visualizer .bar");

const starfield = document.getElementById("starfield");

const shootingStars = document.getElementById("shootingStars");

const floatingHearts = document.getElementById("floatingHearts");

const confetti = document.getElementById("confetti");

const cursorGlow = document.getElementById("cursorGlow");

const dynamicLight = document.getElementById("dynamicLight");


/* ==========================================================
   STORY
   ========================================================== */

const scenes = [

{

title:"Happy Friendship Day ❤️",

text:
"Today is a celebration of the wonderful bond we share. Every smile, every laugh and every unforgettable moment has made life brighter."

},

{

title:"Thank You",

text:
"Thank you for every memory. From silly conversations to unforgettable adventures, every moment became special because you were there."

},

{

title:"Real Friendship",

text:
"Real friendship never fades. Distance, time and busy lives can never erase genuine connections built from trust and care."

},

{

title:"No Matter Where",

text:
"No matter where life takes us, I'll always be grateful for our friendship. Some people become part of our hearts forever."

},

{

title:"Happy Friendship Day ❤️",

text:
"I hope this journey reminds you how important you are. Wishing you happiness, success and endless smiles every single day."

},

{

title:"Best Friends Forever ♾️",

text:
"Best Friends Forever. Thank you for being an amazing friend. May this friendship shine like the stars forever."

}

];


/* ==========================================================
   VARIABLES
   ========================================================== */

let currentScene = 0;

let typingTimer = null;

let musicStarted = false;

let audioContext = null;

let analyser = null;

let sourceNode = null;

let frequencyData = null;


/* ==========================================================
   LOADER
   ========================================================== */

window.addEventListener("load",()=>{

setTimeout(()=>{

loader.style.opacity="0";

loader.style.pointerEvents="none";

setTimeout(()=>{

loader.remove();

showScene(0);

},1000);

},3000);

});


/* ==========================================================
   TYPEWRITER
   ========================================================== */

function typeWriter(text){

clearInterval(typingTimer);

typewriter.textContent="";

let index=0;

typingTimer=setInterval(()=>{

typewriter.textContent+=text.charAt(index);

index++;

if(index>=text.length){

clearInterval(typingTimer);

}

},32);

}


/* ==========================================================
   SHOW SCENE
   ========================================================== */

function showScene(index){

currentScene=index;

sceneTitle.textContent=scenes[index].title;

typeWriter(scenes[index].text);

indicator.textContent=`Scene ${index+1} of ${scenes.length}`;

document.querySelector(".glass-card").style.animation=
"cardAppear .7s ease";

updateLighting();

if(index===scenes.length-1){

launchConfetti();

replayBtn.classList.add("show");

}else{

replayBtn.classList.remove("show");

}

}


/* ==========================================================
   NEXT / PREVIOUS
   ========================================================== */

function nextScene(){

if(currentScene<scenes.length-1){

showScene(currentScene+1);

}

}

function previousScene(){

if(currentScene>0){

showScene(currentScene-1);

}

}

nextSceneBtn.addEventListener("click",nextScene);

prevSceneBtn.addEventListener("click",previousScene);


/* ==========================================================
   CLICK ANYWHERE
   ========================================================== */

document.body.addEventListener("click",(e)=>{

if(e.target.tagName==="BUTTON") return;

if(e.target.tagName==="INPUT") return;

nextScene();

startMusic();

});


/* ==========================================================
   REPLAY
   ========================================================== */

replayBtn.addEventListener("click",()=>{

currentScene=0;

showScene(0);

window.scrollTo(0,0);

});


/* ==========================================================
   MUSIC
   ========================================================== */

function startMusic(){

if(musicStarted) return;

musicStarted=true;

audio.play();

setupVisualizer();

playButton.textContent="❚❚";

}

playButton.addEventListener("click",()=>{

if(audio.paused){

audio.play();

startMusic();

playButton.textContent="❚❚";

}else{

audio.pause();

playButton.textContent="▶";

}

});

volume.addEventListener("input",()=>{

audio.volume=volume.value;

});


/* ==========================================================
   AUDIO PROGRESS
   ========================================================== */

audio.addEventListener("loadedmetadata",()=>{

duration.textContent=format(audio.duration);

});

audio.addEventListener("timeupdate",()=>{

progress.value=(audio.currentTime/audio.duration)*100||0;

currentTime.textContent=format(audio.currentTime);

});

progress.addEventListener("input",()=>{

audio.currentTime=

(progress.value/100)*audio.duration;

});


/* ==========================================================
   FORMAT TIME
   ========================================================== */

function format(time){

const min=Math.floor(time/60);

const sec=Math.floor(time%60);

return `${min}:${sec.toString().padStart(2,"0")}`;

}
/* ==========================================================
   WEB AUDIO VISUALIZER
   ========================================================== */

function setupVisualizer(){

    if(audioContext) return;

    const AudioContextClass =
        window.AudioContext ||
        window.webkitAudioContext;

    audioContext = new AudioContextClass();

    sourceNode =
        audioContext.createMediaElementSource(audio);

    analyser =
        audioContext.createAnalyser();

    analyser.fftSize = 64;

    frequencyData =
        new Uint8Array(analyser.frequencyBinCount);

    sourceNode.connect(analyser);

    analyser.connect(audioContext.destination);

    animateVisualizer();

}

function animateVisualizer(){

    if(!analyser) return;

    analyser.getByteFrequencyData(frequencyData);

    visualizer.forEach((bar,index)=>{

        const value =
            frequencyData[index] || 0;

        const height =
            12 + (value/255)*55;

        bar.style.height = height + "px";

    });

    requestAnimationFrame(animateVisualizer);

}


/* ==========================================================
   STARFIELD
   ========================================================== */

function createStars(){

    const count = 220;

    for(let i=0;i<count;i++){

        const star =
            document.createElement("span");

        star.className="star";

        star.style.left =
            Math.random()*100 + "%";

        star.style.top =
            Math.random()*100 + "%";

        const size =
            Math.random()*3+1;

        star.style.width =
            size+"px";

        star.style.height =
            size+"px";

        star.style.animationDuration =
            (2+Math.random()*6)+"s";

        star.style.animationDelay =
            Math.random()*5+"s";

        starfield.appendChild(star);

    }

}


/* ==========================================================
   SHOOTING STARS
   ========================================================== */

function shootingStar(){

    const star =
        document.createElement("div");

    star.className="shooting-star";

    star.style.top =
        Math.random()*40+"%";

    star.style.left =
        100+Math.random()*20+"%";

    shootingStars.appendChild(star);

    setTimeout(()=>{

        star.remove();

    },2500);

}

setInterval(shootingStar,3500);


/* ==========================================================
   FLOATING HEARTS
   ========================================================== */

function spawnHeart(){

    const heart =
        document.createElement("div");

    heart.className="heart";

    heart.innerHTML="❤";

    heart.style.left =
        Math.random()*100+"%";

    heart.style.bottom="-30px";

    heart.style.fontSize =
        (16+Math.random()*18)+"px";

    heart.style.animationDuration =
        (5+Math.random()*5)+"s";

    floatingHearts.appendChild(heart);

    setTimeout(()=>{

        heart.remove();

    },10000);

}

setInterval(spawnHeart,900);


/* ==========================================================
   CONFETTI
   ========================================================== */

function launchConfetti(){

    for(let i=0;i<220;i++){

        const piece =
            document.createElement("div");

        piece.className="confetti-piece";

        piece.style.left =
            Math.random()*100+"%";

        piece.style.top="-20px";

        piece.style.background=

            `hsl(${Math.random()*360},
            90%,
            65%)`;

        piece.style.animationDuration=
            (3+Math.random()*3)+"s";

        piece.style.animationDelay=
            Math.random()*0.8+"s";

        confetti.appendChild(piece);

        setTimeout(()=>{

            piece.remove();

        },7000);

    }

}


/* ==========================================================
   CURSOR GLOW
   ========================================================== */

document.addEventListener("mousemove",(e)=>{

    cursorGlow.style.left =
        e.clientX+"px";

    cursorGlow.style.top =
        e.clientY+"px";

});


/* ==========================================================
   CURSOR TRAIL
   ========================================================== */

document.addEventListener("mousemove",(e)=>{

    const trail =
        document.createElement("div");

    trail.className="trail";

    trail.style.left =
        e.clientX+"px";

    trail.style.top =
        e.clientY+"px";

    document.body.appendChild(trail);

    setTimeout(()=>{

        trail.remove();

    },800);

});


/* ==========================================================
   DYNAMIC LIGHTING
   ========================================================== */

const lighting=[

"radial-gradient(circle at 50% 40%,rgba(0,180,255,.10),transparent 70%)",

"radial-gradient(circle at 30% 20%,rgba(140,100,255,.12),transparent 70%)",

"radial-gradient(circle at 70% 25%,rgba(0,255,210,.10),transparent 70%)",

"radial-gradient(circle at 50% 50%,rgba(255,255,255,.08),transparent 70%)",

"radial-gradient(circle at 25% 70%,rgba(120,170,255,.11),transparent 70%)",

"radial-gradient(circle at 70% 70%,rgba(170,120,255,.12),transparent 70%)"

];

function updateLighting(){

    dynamicLight.style.background =
        lighting[currentScene];

}


/* ==========================================================
   KEYBOARD SUPPORT
   ========================================================== */

document.addEventListener("keydown",(e)=>{

    if(e.key==="ArrowRight"){

        nextScene();

    }

    if(e.key==="ArrowLeft"){

        previousScene();

    }

    if(e.code==="Space"){

        e.preventDefault();

        if(audio.paused){

            audio.play();

            startMusic();

            playButton.textContent="❚❚";

        }else{

            audio.pause();

            playButton.textContent="▶";

        }

    }

});


/* ==========================================================
   PERFORMANCE LOOP
   ========================================================== */

function animationLoop(){

    requestAnimationFrame(animationLoop);

}

animationLoop();


/* ==========================================================
   INITIALIZE
   ========================================================== */

createStars();

updateLighting();

audio.volume=0.6;


/* ==========================================================
   END OF PROJECT
   ========================================================== */