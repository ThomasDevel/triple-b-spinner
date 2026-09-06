const template = document.createElement("template");
template.innerHTML = `
<div>
  <div class="wrapper">
    <div id="slot0" class="slot"></div>
    <div id="slot1" class="slot"></div>
    <div id="slot2" class="slot"></div>
  </div>

  <div>
    <button class="button" onclick="spin()">Spin</button>
  </div>

  <div id="images"></div>
  <p class="info"></p>
</div>
`;

class Spinner extends HTMLElement {
  constructor() {
    super();
    const shadowRoot = this.attachShadow({ mode: "closed" });
    let clone = template.content.cloneNode(true);
    shadowRoot.append(clone);
  }

  spin() {
    const container = document.getElementsByClassName("root")[0];
    let spinStart = container.style.getPropertyValue("--spinStart");
    let spinStop = container.style.getPropertyValue("--spinStop");
    let runs = container.style.getPropertyValue("--runs");

    if (runs > 0) {
      container.style.setProperty("--runs", runs + 1);
      container.style.setProperty("--spinStart", spinStop);
      container.style.setProperty("--spinStop", spinStop + 20);
    }

    if (runs === 0) {
      container.style.setProperty("--runs", runs + 1);
    }

    let slot0 = document.getElementById("slot0");
    let slot1 = document.getElementById("slot1");
    let slot2 = document.getElementById("slot2");

    slot0.classList.add("slot-offset0");
    slot1.classList.add("slot-offset1");
    slot2.classList.add("slot-offset2");
  }
}

customElements.define("triple-b", Spinner);
