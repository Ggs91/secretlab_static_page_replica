var requestAnimationFrame = window.requestAnimationFrame ||
                            window.mozRequestAnimationFrame ||
                            window.webkitRequestAnimationFrame ||
                            window.msRequestAnimationFrame;
var xScrollPosition; //On les déclare ici, on va les utiliser à plusieurs reprise
var yScrollPosition;

//Shrink du header quand on scroll à un certain niveau
window.addEventListener("DOMContentLoaded", scrollHeader, false);

var header = document.getElementsByClassName("header-wrapper")[0];

function scrollHeader(e){

  yScrollPosition = window.scrollY; //récupère la position Y du scroll à un instant donné (cette action est fait 60fois/s quand le navigateur est dispo pour grace a requestAnimationFrame qui appel la fction)

  if (yScrollPosition < 160 && x.matches)  {//header passe de 6.3 a 4rem si on passe les 160 de scroll ET qu'on est à un breakpoint superieur à 10000px
    header.style.height = '6.3rem';
  } else if (yScrollPosition > 160 && x.matches){
    header.style.height = '4rem';
  } else {
    header.style.height = '4rem'; //Si sous les 1000px le header sera tjs a 4rem
  }
  requestAnimationFrame(scrollHeader);
}

var x = window.matchMedia("(min-width: 1000px)") //Media query js for the header.
scrollHeader(x)
x.addListener(scrollHeader)


// Changing color of form border-bottom

let sidebarForm = document.getElementsByClassName("sidebar-form")[0]
let sidebarInput = document.querySelectorAll(".sidebar-form input")[0]

sidebarInput.addEventListener("focus", function(){
  sidebarForm.style.borderColor = "#a72a2f";
})
sidebarInput.addEventListener("focusout", function(){
  sidebarForm.style.borderColor = "";
})


// parallax for show section
window.addEventListener("DOMContentLoaded", scrollLoop, false);

const showcase = document.getElementById("showcase")
const showcaseBG = document.querySelector(".showcase-bg");

function scrollLoop(e) {// requestAnimation frame fait en sorte que cette fction soit appeléé 60 fois par second. Dc 60 fois par sec on appel setTranslate qui va update le transform3D de l'img donc sa position
  xScrollPosition = window.scrollX; //On utilise donc pas le scoll event js pour avoir la position du scroll qui est moins performant, main une demande de la position x et y du scroll à un moment précis 60/s.
  yScrollPosition = window.scrollY;
  if (isVisible(showcase)) { //activate animation only if the showcase section appear in the viewport
    setTranslate(0, yScrollPosition * 0.15, showcaseBG);
  }
  requestAnimationFrame(scrollLoop);
}

function setTranslate(xPos, yPos, el){
  el.style.transform = `translate3d(${xPos}px, ${yPos}px, 0)`; // We change translate3d instead of translate for pers optimisation. It will be handle by GPU instead of GPU
}

function isVisible (ele) {
  const { top, bottom } = ele.getBoundingClientRect();
  const vHeight = (window.innerHeight || document.documentElement.clientHeight);

  return (
    (top > 0 || bottom > 0) &&
    top < vHeight);
}
