class InputComponent extends HTMLElement {
  static get observedAttributes() {
    return ["label", "type", "id", "placeholder", "icon", "value", "required"];
  }

  constructor() {
    super();
    this.attachShadow({ mode: "open" });

    this.shadowRoot.innerHTML = `
      <style>
        .input-container {
          display: flex;
          flex-direction: column;
          gap: 5px;
        }

        .input-field {
          display: flex;
          align-items: center;
          gap: 8px;
          background: #ffffff;
          border: 1px solid #ddd;
          padding: 8px;
          border-radius: 6px;
        } 

        .input-field input {
          border: none;
          outline: none;
          width: 100%;
          font: inherit;
        }

        .input-field img {
          width: 20px;
          height: 20px;
          display: none;
        }
      </style>

      <div class="input-container">
        <label></label>
        <div class="input-field">
          <img>
          <input>
        </div>
      </div>
    `;

    this.labelEl = this.shadowRoot.querySelector("label");
    this.imgEl = this.shadowRoot.querySelector("img");
    this.inputEl = this.shadowRoot.querySelector("input");
  }

  // Expose value
  get value() {
    return this.inputEl.value;
  }

  set value(val) {
    this.inputEl.value = val;
  }

  attributeChangedCallback(name, oldValue, newValue) {
    switch (name) {
      case "label":
        this.labelEl.textContent = newValue || "";
        break;

      case "type":
        this.inputEl.type = newValue || "text";
        break;

      case "id":
        this.inputEl.id = newValue;
        this.labelEl.setAttribute("for", newValue);
        break;

      case "placeholder":
        this.inputEl.placeholder = newValue || "";
        break;

      case "icon":
        if (newValue) {
          this.imgEl.src = newValue;
          this.imgEl.style.display = "block";
        } else {
          this.imgEl.style.display = "none";
        }
        break;

      case "value":
        this.inputEl.value = newValue;
        break;

      case "required":
        if (newValue !== null) {
          this.inputEl.setAttribute("required", "");
        } else {
          this.inputEl.removeAttribute("required");
        }
        break;
    }
  }
}

customElements.define("input-component", InputComponent);
