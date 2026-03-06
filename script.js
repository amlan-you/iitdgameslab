const video = document.getElementById("scrollVideo");

if (video) {

const title = document.getElementById("heroTitle");
const subtitle = document.getElementById("heroSubtitle");

/* ✅ Hero active zone */
const HERO_ZONE = 900;

/* ✅ State */
let isVideoComplete = false;

/* ✅ Timeline text */
const timeline = [
  { time: 0.45, title: "Gaming.", subtitle: "Designing meaningful play experiences that drive learning, empathy, and change" },
  { time: 1.05, title: "Augmented.", subtitle: "Expanding perception through interactive overlays that blend digital with real" },
  { time: 1.55, title: "Mixed-Reality.", subtitle: "Creating hybrid environments where virtual and physical worlds converge" },
  { time: 2.05, title: "Experiences.", subtitle: "Crafting immersive narratives that connect design, behaviour, and emotion" },
  { time: 2.55, title: "Simulations.", subtitle: "Transforming research and data into interactive, learn-by-doing environments" },
  { time: 3.05, title: "Lab.", subtitle: "Where Play Meets Purpose" }
];

document.body.style.overflow = "hidden";

video.addEventListener("loadedmetadata", () => {

window.addEventListener("wheel", (e) => {

const scrollTop = window.scrollY;

if (scrollTop < HERO_ZONE) {

if (!isVideoComplete) {

e.preventDefault();

let delta = e.deltaY * 0.003;
video.currentTime += delta;

if (video.currentTime < 0) video.currentTime = 0;
if (video.currentTime > video.duration)
video.currentTime = video.duration;

updateText(video.currentTime);

if (video.currentTime >= video.duration - 0.1) {
isVideoComplete = true;
document.body.style.overflow = "auto";
document.getElementById("scrollIndicator").style.opacity = "0";
}

}

else {
document.body.style.overflow = "auto";
}
}

else {
document.body.style.overflow = "auto";
}

}, { passive: false });


window.addEventListener("scroll", () => {

if (window.scrollY < 50) {
isVideoComplete = false;
document.body.style.overflow = "hidden";
document.getElementById("scrollIndicator").style.opacity = "1";
}

});

});


function updateText(currentTime) {
for (let i = timeline.length - 1; i >= 0; i--) {
if (currentTime >= timeline[i].time) {
title.innerText = timeline[i].title;
subtitle.innerText = timeline[i].subtitle;
break;
}
}
}

}

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

const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");

if(menuToggle){
menuToggle.addEventListener("click", ()=>{
navLinks.classList.toggle("show-menu");
});
}