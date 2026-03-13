/* ========================= */
/* HERO VIDEO SCRUB SYSTEM */
/* ========================= */

const video = document.getElementById("scrollVideo");

if (video) {

const title = document.getElementById("heroTitle");
const subtitle = document.getElementById("heroSubtitle");

/* Hero active zone */
const HERO_ZONE = 900;

/* State */
let isVideoComplete = false;

/* Animation control */
let targetTime = 0;
let isTicking = false;

/* Timeline text */
const timeline = [
{ time: 0.0, title: "Lab.", subtitle: "Where Play Meets Purpose!" },
{ time: 0.23, title: "Gaming.", subtitle: "Designing meaningful play experiences that drive learning, empathy, and change" },
{ time: 0.52, title: "Augmented.", subtitle: "Expanding perception through interactive overlays that blend digital with real" },
{ time: 0.77, title: "Mixed-Reality.", subtitle: "Creating hybrid environments where virtual and physical worlds converge" },
{ time: 1.02, title: "Experiences.", subtitle: "Crafting immersive narratives that connect design, behaviour, and emotion" },
{ time: 1.25, title: "Simulations.", subtitle: "Transforming research and data into interactive, learn-by-doing environments" },
{ time: 1.5, title: "Lab.", subtitle: "Where Play Meets Purpose!" }
];

/* Lock scroll initially */
document.body.style.overflow = "hidden";

video.addEventListener("loadedmetadata", () => {

targetTime = video.currentTime;

window.addEventListener("wheel", (e) => {

const scrollTop = window.scrollY;

if (scrollTop < HERO_ZONE && !isVideoComplete) {

e.preventDefault();

/* update target time */
targetTime += e.deltaY * 0.003;

/* clamp values */
targetTime = Math.max(0, Math.min(video.duration, targetTime));

/* schedule update */
if (!isTicking) {
requestAnimationFrame(updateVideo);
isTicking = true;
}

}

}, { passive:false });

});


function updateVideo(){

video.currentTime = targetTime;
updateText(video.currentTime);

if (video.currentTime >= video.duration - 0.1) {

isVideoComplete = true;
document.body.style.overflow = "auto";

const indicator = document.getElementById("scrollIndicator");
if (indicator) indicator.style.opacity = "0";

}

isTicking = false;

}


/* Reset when user scrolls back up */

window.addEventListener("scroll", () => {

if (window.scrollY < 50) {

isVideoComplete = false;
document.body.style.overflow = "hidden";

const indicator = document.getElementById("scrollIndicator");
if (indicator) indicator.style.opacity = "1";

}

});


function updateText(currentTime){

for (let i = timeline.length - 1; i >= 0; i--) {

if (currentTime >= timeline[i].time) {

title.innerText = timeline[i].title;
subtitle.innerText = timeline[i].subtitle;
break;

}

}

}

}


/* ========================= */
/* NAV ACTIVE LINK */
/* ========================= */

const sections = document.querySelectorAll("section");
const navItems = document.querySelectorAll(".nav-links li");

window.addEventListener("scroll", () => {

let current = "";

sections.forEach(section => {

const sectionTop = section.offsetTop - 120;
const sectionHeight = section.offsetHeight;

if (window.scrollY >= sectionTop &&
window.scrollY < sectionTop + sectionHeight) {

current = section.getAttribute("id");

}

});

navItems.forEach(li => {

li.classList.remove("active");

const link = li.querySelector("a");

if (link && link.getAttribute("href") === "#" + current) {

li.classList.add("active");

}

});

});


/* ========================= */
/* MOBILE MENU */
/* ========================= */

const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");

if (menuToggle && navLinks){

menuToggle.addEventListener("click", () => {

navLinks.classList.toggle("show-menu");

});

}