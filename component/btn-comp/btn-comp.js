class ButtonComponent extends HTMLElement {

  static get observedAttributes() {
    return ["text", "icon", "disabled", "type"];
  }

  constructor() {
    super();
    this.attachShadow({ mode: "open" });

    this.shadowRoot.innerHTML = `
      <style>
        :host {
          display: inline-block;
          width: var(--btn-width, auto);
          height: var(--btn-height, auto);
        }

        button {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          padding: var(--btn-padding, 8px 14px);
          border-radius: var(--btn-radius, 6px);
          background: var(--btn-bg, #eee);
          color: var(--btn-color, #000);
          border: var(--btn-border, 1px solid #ccc);
          cursor: pointer;
          width: 100%;
          height: 100%;
          min-height: var(--btn-min-height, 38px);
          font: inherit;
          outline: none;
          transition: transform .05s ease, background .2s ease;
        }

        button:active {
          transform: scale(0.97);
        }

        button:disabled {
          opacity: .6;
          cursor: not-allowed;
        }

        img {
          width: var(--icon-size, 20px);
          height: var(--icon-size, 20px);
        }
      </style>

      <button>
        <img hidden />
        <span></span>
      </button>
    `;

    this.btn = this.shadowRoot.querySelector("button");
    this.textEl = this.shadowRoot.querySelector("span");
    this.iconEl = this.shadowRoot.querySelector("img");

    // ✅ FIX: enable real form submission from shadow DOM
    this.btn.addEventListener("click", () => {
      if (this.hasAttribute("disabled")) return;

      const form = this.closest("form");
      if (form && this.btn.type === "submit") {
        form.requestSubmit();
      }
    });
  }

  connectedCallback() {
    this._syncAll();
  }

  attributeChangedCallback(name, oldVal, newVal) {
    this._sync(name, newVal);
  }

  _syncAll() {
    ButtonComponent.observedAttributes.forEach(attr => {
      this._sync(attr, this.getAttribute(attr));
    });
  }

  _sync(name, value) {
    switch (name) {

      case "text":
        this.textEl.textContent = value || "";
        break;

      case "icon":
        if (value) {
          this.iconEl.src = value;
          this.iconEl.hidden = false;
        } else {
          this.iconEl.hidden = true;
        }
        break;

      case "type":
        this.btn.type = value || "submit";
        break;

      case "disabled":
        this.btn.disabled = value !== null;
        break;
    }
  }
}

customElements.define("btn-component", ButtonComponent);
