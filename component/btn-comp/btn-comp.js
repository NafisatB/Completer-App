class ButtonComponent extends HTMLElement {
  static get observedAttributes() {
    return ["text", "id", "icon"];
  }

  constructor() {
    super();
    this.attachShadow({ mode: "open" });

    this.shadowRoot.innerHTML = `
      <style>
        :host {
          display: flex;
          width: var(--btn-width, auto);
          height: var(--btn-height, auto);
        }

        .btn-container {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          box-sizing: border-box;
          padding: var(--btn-padding, 8px);
          border-radius: var(--btn-radius, 6px);
          background: var(--btn-bg, #eee);
          color: var(--btn-color, #000);
          border: var(--btn-border, 1px solid #ccc);
          cursor: pointer;
          width: 100%;
          height: 100%;
          min-height: var(--btn-min-height, 38px);
          font: inherit;
        }

        .btn-container img {
          width: var(--icon-size, 20px);
          height: var(--icon-size, 20px);
          object-fit: contain;
        }

        .btn-container span {
          display: inline-block;
          line-height: 1;
        }
      </style>

      <button class="btn-container" type="button">
        <img alt="">
        <span></span>
      </button>
    `;

    this.textEl = this.shadowRoot.querySelector("span");
    this.imgEl = this.shadowRoot.querySelector("img");
    this.btnEl = this.shadowRoot.querySelector("button");

    this.btnEl.addEventListener("click", () => {
      this.dispatchEvent(new MouseEvent("click", { bubbles: true, composed: true }));
    });
  }

  connectedCallback() {
    this._updateFromAttributes();

    if (this.hasAttribute("onclick")) {
      const handler = this.getAttribute("onclick");
      this.addEventListener("click", (e) => {
        new Function(handler).call(this, e);
      });
    }
  }

  attributeChangedCallback(name, oldVal, newVal) {
    this._updateAttr(name, newVal);
  }

  _updateFromAttributes() {
    this._updateAttr("text", this.getAttribute("text"));
    this._updateAttr("id", this.getAttribute("id"));
    this._updateAttr("icon", this.getAttribute("icon"));
  }

  _updateAttr(name, value) {
    switch (name) {
      case "text":
        this.textEl.textContent = value ?? "";
        this.textEl.style.display = value ? "inline-block" : "none";
        break;

      case "id":
        if (value) this.btnEl.id = value;
        else this.btnEl.removeAttribute("id");
        break;

      case "icon":
        if (value) {
          this.imgEl.src = value;
          this.imgEl.style.display = "inline-block";
        } else {
          this.imgEl.removeAttribute("src");
          this.imgEl.style.display = "none";
        }
        break;
    }
  }
}

customElements.define("btn-component", ButtonComponent);
