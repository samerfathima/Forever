/* ======================================================
   FOREVER.
   SPA.JS
   PART 1
====================================================== */

const app = document.getElementById("app");

const music = document.getElementById("bg-music");
const musicBtn = document.getElementById("music-btn");

/* ======================================================
   MUSIC
====================================================== */

musicBtn.addEventListener("click",()=>{

    if(music.paused){

        music.play().catch(()=>{});

        musicBtn.innerHTML="❚❚";

    }

    else{

        music.pause();

        musicBtn.innerHTML="♫";

    }

});


/* ======================================================
   STORIES
====================================================== */

const stories=[

{

image:"images/story1.JPG",

quote:"In a world full of countless stories... ours quietly began."

},

{

image:"images/story2.JPG",

quote:"Some moments aren't planned... they're simply meant to be."

},

{

image:"images/story3.JPG",

quote:"And before we knew it... forever had found us."

}

];


let currentStory=0;


/* ======================================================
   SHOW STORY
====================================================== */

function showStory(index){

const story=stories[index];

app.innerHTML=`

<div class="story-page">

    <div
        class="story-bg"
        style="background-image:url('${story.image}')">
    </div>

    <div class="story-overlay"></div>

    <div class="story-content">

        <div class="story-progress">

            ${stories.map((item,i)=>`

            <div class="progress ${i<=index?'active':''}">

                <span></span>

            </div>

            `).join("")}

        </div>

        <button
            class="skip-btn"
            id="skipBtn">

            Skip →

        </button>

        <div class="story-text">

            <h2>

                ${story.quote}

            </h2>

        </div>

    </div>

</div>

`;

document
.getElementById("skipBtn")
.addEventListener("click",showHome);

}
/* ======================================================
   SPA.JS
   PART 2
====================================================== */

/* ======================================================
   NEXT STORY
====================================================== */

function nextStory(){

    currentStory++;

    if(currentStory >= stories.length){

        showHome();

        return;

    }

    showStory(currentStory);

}


/* ======================================================
   PREVIOUS STORY
====================================================== */

function previousStory(){

    if(currentStory===0) return;

    currentStory--;

    showStory(currentStory);

}


/* ======================================================
   CLICK NAVIGATION
====================================================== */

document.addEventListener("click",(e)=>{

    const page = document.querySelector(".story-page");

    if(!page) return;

    /* Ignore button clicks */
    if(
        e.target.closest(".skip-btn") ||
        e.target.closest("#music-btn")
    ){
        return;
    }

    const x = e.clientX;

    if(x > window.innerWidth / 2){

        nextStory();

    }else{

        previousStory();

    }

});


/* ======================================================
   KEYBOARD
====================================================== */

document.addEventListener("keydown",(e)=>{

    if(!document.querySelector(".story-page")) return;

    if(e.key==="ArrowRight"){

        nextStory();

    }

    if(e.key==="ArrowLeft"){

        previousStory();

    }

});


/* ======================================================
   MOBILE SWIPE
====================================================== */

let touchStartX=0;

document.addEventListener("touchstart",(e)=>{

    touchStartX=e.changedTouches[0].screenX;

});


document.addEventListener("touchend",(e)=>{

    if(!document.querySelector(".story-page")) return;

    const touchEndX=e.changedTouches[0].screenX;

    const distance=touchStartX-touchEndX;

    if(distance>60){

        nextStory();

    }

    if(distance<-60){

        previousStory();

    }

});
/* ======================================================
   SPA.JS
   PART 3
====================================================== */

/* ======================================================
   HOME PAGE
====================================================== */

function showHome(){

    app.innerHTML = `

    <div class="home-page">

        <button
            class="back-btn"
            id="backStory">

            ← Story

        </button>

        <div class="home-overlay">

            <h1 class="forever-title">

<span style="--i:1">F</span>
<span style="--i:2">o</span>
<span style="--i:3">r</span>
<span style="--i:4">e</span>
<span style="--i:5">v</span>
<span style="--i:6">e</span>
<span style="--i:7">r</span>
<span style="--i:8">.</span>

</h1> 

            <p>

                Every picture tells a story,<br>
                every memory lasts forever.

            </p>

            <button
                class="enter-btn"
                id="enterGallery">

                Enter Gallery 

            </button>

        </div>

    </div>

    `;

    document
    .getElementById("enterGallery")
    .addEventListener("click",showGallery);

    document
    .getElementById("backStory")
    .addEventListener("click",()=>{

        currentStory = 0;

        openStory(currentStory);

    });

}
/* ======================================================
   FADE TRANSITION
====================================================== */

function changeScreen(callback){

    app.style.opacity="0";

    setTimeout(()=>{

        callback();

        app.style.opacity="1";

    },300);

}


/* ======================================================
   OPEN HOME
====================================================== */

function openHome(){

    changeScreen(()=>{

        showHome();

    });

}


/* ======================================================
   OPEN STORY
====================================================== */

function openStory(index){

    changeScreen(()=>{

        showStory(index);

    });

}
/* ======================================================
   SPA.JS
   PART 4
====================================================== */

/* ======================================================
   GALLERY
====================================================== */

function showGallery(){

    let images = "";

    for(let i=1;i<=46;i++){

        images += `

        <img
            src="images/img${i}.jpg"
            class="gallery-item"
            loading="lazy"
            alt="Wedding Photo ${i}">

        `;

    }

    app.innerHTML = `

    <div class="gallery-page">

        <a
            href="#"
            class="back-btn"
            id="backHome">

            ← Back Home

        </a>

        <div class="gallery-container">

            ${images}

        </div>

    </div>

    `;

    document
    .getElementById("backHome")
    .addEventListener("click",(e)=>{

        e.preventDefault();

        openHome();

    });

}


/* ======================================================
   STORY NAVIGATION UPDATE
====================================================== */

function nextStory(){

    currentStory++;

    if(currentStory >= stories.length){

        openHome();

        return;

    }

    openStory(currentStory);

}


function previousStory(){

    if(currentStory===0) return;

    currentStory--;

    openStory(currentStory);

}


/* ======================================================
   START WEBSITE
====================================================== */

app.style.opacity="1";

showStory(0);