// example https://codepen.io/tangxuguo/pen/xqrNmx
// https://blog.logrocket.com/making-css-animations-using-a-sprite-sheet/
// https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_animations/Using_CSS_animations
// https://codepen.io/NeatDesigns/pen/wvJvaYK -> css variables
// https://css-tricks.com/using-custom-properties-to-wrangle-variations-in-keyframe-animations/

(function () {
  "use strict";

  // In the order the frames are stacked in img/css_sprites_top_down.png.
  const FRAME_LABELS = [
    "?",
    "Being Bamboozled",
    "Bobr, Kurwa!",
    "Bobr!",
    "Brothers",
    "Berlin? Bratislava!",
    "Black Betty Bambalam",
    "Bamboozling",
    "Beautiful Bodacious Booze",
    "Bully Boss Business Mykull",
  ];
  const FRAME_COUNT = FRAME_LABELS.length;
  const STORAGE_KEY = "triple-b-spinner:landed-frame";

  const widget = document.querySelector(".spinner");
  const slots = Array.from(widget.querySelectorAll(".slot"));
  const banner = widget.querySelector(".banner");
  const info = document.querySelector(".info");

  let landedFrame = readLandedFrame();
  let spins = 0;
  let spinning = false;

  widget.addEventListener("click", spin);
  widget.addEventListener("keydown", (event) => {
    if (event.key !== "Enter" && event.key !== " ") return;
    event.preventDefault(); // stop the space bar scrolling the host page
    spin();
  });
  widget.style.setProperty("--frame-count", FRAME_COUNT);
  render();

  async function spin() {
    if (spinning) return;
    setSpinning(true);
    hideBanner();

    const from = landedFrame;
    // Frame 0 is the "?" placeholder that a first-time visitor starts on. A
    // spin coming off the last frame steps over it onto frame 1, so once you
    // have spun once it is never shown again.
    const to = (from + 1) % FRAME_COUNT === 0 ? from + 2 : from + 1;

    widget.style.setProperty("--frame-from", from);
    widget.style.setProperty("--frame-to", to);

    await Promise.all(slots.map(runSpin));

    // to and to % FRAME_COUNT sit on the same frame of the repeating sheet,
    // so handing the position back to --frame-landed is invisible.
    landedFrame = to % FRAME_COUNT;
    spins += 1;
    writeLandedFrame(landedFrame);
    render();
    slots.forEach((slot) => slot.classList.remove("is-spinning"));
    showBanner();

    setSpinning(false);
  }

  async function runSpin(slot) {
    slot.classList.remove("is-spinning");
    void slot.offsetWidth; // flush the removal, otherwise re-adding the class does not restart the animation
    slot.classList.add("is-spinning");

    // The settle leg is the last one to run, so it finishing means the whole
    // spin is done.
    const settle = slot
      .getAnimations()
      .find((animation) => animation.animationName === "settle");
    if (!settle) return; // no animation to wait on, so the slot is already on its frame

    await settle.finished.catch(() => {});
  }

  function showBanner() {
    banner.textContent = FRAME_LABELS[landedFrame];
    banner.classList.remove("is-shown");
    void banner.offsetWidth; // same restart flush as the slots need
    banner.classList.add("is-shown");
  }

  function hideBanner() {
    banner.classList.remove("is-shown");
    banner.textContent = "";
  }

  function setSpinning(active) {
    spinning = active;
    widget.classList.toggle("is-busy", active);
    widget.setAttribute("aria-disabled", String(active));
  }

  function render() {
    widget.style.setProperty("--frame-landed", landedFrame);
    info.textContent = `Landed on ${FRAME_LABELS[landedFrame]} · image ${
      landedFrame + 1
    } of ${FRAME_COUNT} · ${spins} ${spins === 1 ? "spin" : "spins"}`;
  }

  function readLandedFrame() {
    try {
      const stored = Number(localStorage.getItem(STORAGE_KEY));
      if (Number.isInteger(stored) && stored >= 0 && stored < FRAME_COUNT) {
        return stored;
      }
    } catch (error) {
      // storage is unavailable on some file:// origins
    }
    return 0;
  }

  function writeLandedFrame(frame) {
    try {
      localStorage.setItem(STORAGE_KEY, String(frame));
    } catch (error) {
      // storage is unavailable on some file:// origins
    }
  }
})();
