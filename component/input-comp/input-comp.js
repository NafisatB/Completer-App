class InputComponent extends HTMLElement {
  static get observedAttributes() {
    return ["label", "type", "id", "placeholder", "icon"];
  }

  constructor() {
    super();
    this.attachShadow({ mode: "open" });

    // Initial structure
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
        }

        .input-field img {
          width: 20px;
          height: 20px;
          color: #999;
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

  // Called when attributes change
  attributeChangedCallback(name, oldValue, newValue) {
    switch (name) {
      case "label":
        this.labelEl.textContent = newValue;
        break;
      case "type":
        this.inputEl.type = newValue;
        break;
      case "id":
        this.inputEl.id = newValue;
        this.labelEl.setAttribute("for", newValue);
        break;
      case "placeholder":
        this.inputEl.placeholder = newValue;
        break;
      case "icon":
        this.imgEl.src = newValue;
        break;
    }
  }
}

customElements.define("input-component", InputComponent);
