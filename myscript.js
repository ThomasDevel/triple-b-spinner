function init() {
  "use strict";

  // example https://codepen.io/tangxuguo/pen/xqrNmx
  // https://blog.logrocket.com/making-css-animations-using-a-sprite-sheet/
  // https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_animations/Using_CSS_animations
  // https://codepen.io/NeatDesigns/pen/wvJvaYK -> css variables
  // https://css-tricks.com/using-custom-properties-to-wrangle-variations-in-keyframe-animations/

  const paths = [
    "images/bamboozling.png",
    "images/bamboozled.png",
    "images/business.png",
    "images/booze.png",
    "images/bambalam.png",
    "images/bratislava.png",
    "images/brothers.png",
    "images/bobr.png",
    "images/bobr_kurwa.png",
  ];

  paths.forEach((imagePath, index) => {
    let img = document.createElement("img");
    img.src = imagePath;
    img.width = 100;
    img.height = 100;
    document.getElementById("images").appendChild(img);
  });

  // let iterationCount = 0;

  // const animation = document.querySelector(".slot");
  // const animations = document.querySelectorAll(".slot");

  // document.getElementById("wrapper").onclick = function () {
  //   let element0 = document.getElementById("slot0");
  //   let element1 = document.getElementById("slot1");
  //   let element2 = document.getElementById("slot2");

  //   element0.classList.add("slot-offset0");
  //   element1.classList.add("slot-offset1");
  //   element2.classList.add("slot-offset2");
  // };

  // const doors = document.querySelectorAll(".slot");
  // document.querySelector("#spinner").addEventListener("click", spin);
  // document.querySelector("#reseter").addEventListener("click", init);

  // async function spin() {
  //   init(false, 1, 2);
  //   for (const door of doors) {
  //     const boxes = door.querySelector(".boxes");
  //     const duration = parseInt(boxes.style.transitionDuration);
  //     boxes.style.transform = "translateY(0)";
  //     await new Promise((resolve) => setTimeout(resolve, duration * 100));
  //   }
  // }
}

function spin() {
  let slot0 = document.getElementById("slot0");
  let slot1 = document.getElementById("slot1");
  let slot2 = document.getElementById("slot2");

  slot0.classList.add("slot-offset0");
  slot1.classList.add("slot-offset1");
  slot2.classList.add("slot-offset2");
}

init();
