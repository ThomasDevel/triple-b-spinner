(function () {
  "use strict";

  const STORAGE_KEY = "triple-b-spinner:landed-frame";
  const widget = document.querySelector(".spinner");
  const slots = widget.querySelectorAll(".slot");
  const labels = [...widget.querySelectorAll("[data-frame]")];
  const lastSlot = slots[slots.length - 1];
  const info = document.querySelector(".info");
  const frameCount = labels.length;

  let landed = readLanded();
  let spins = 0;

  widget.addEventListener("click", spin);
  lastSlot.addEventListener("animationend", onLanded);
  show(landed);

  function spin() {
    widget.classList.remove("has-result");
    const from = landed;
    // Frame 0 is the first-visit "?" placeholder; skip it after that.
    const to = (from + 1) % frameCount === 0 ? from + 2 : from + 1;
    widget.style.setProperty("--frame-from", from);
    widget.style.setProperty("--frame-to", to);
    widget.disabled = true;
    slots.forEach((slot) => slot.classList.remove("is-spinning"));
    void widget.offsetWidth;
    slots.forEach((slot) => slot.classList.add("is-spinning"));
    landed = to % frameCount;
  }

  function onLanded(event) {
    if (event.animationName !== "settle") return;
    spins += 1;
    writeLanded(landed);
    slots.forEach((slot) => slot.classList.remove("is-spinning"));
    widget.disabled = false;
    show(landed);
    void widget.offsetWidth;
    widget.classList.add("has-result");
  }

  function show(frame) {
    widget.style.setProperty("--frame-landed", frame);
    widget.dataset.landed = String(frame);
    const noun = spins === 1 ? "spin" : "spins";
    info.textContent = `Landed on ${labels[frame].textContent} · image ${
      frame + 1
    } of ${frameCount} · ${spins} ${noun}`;
  }

  function readLanded() {
    try {
      const stored = Number(localStorage.getItem(STORAGE_KEY));
      if (Number.isInteger(stored) && stored >= 0 && stored < frameCount) {
        return stored;
      }
    } catch (error) {}
    return 0;
  }

  function writeLanded(frame) {
    try {
      localStorage.setItem(STORAGE_KEY, String(frame));
    } catch (error) {}
  }
})();
