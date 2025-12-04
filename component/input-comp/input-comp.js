class InputComponent extends HTMLElement {
  static get observedAttributes() {
    return ["label", "type", "name", "id", "placeholder", "icon", "value", "required"];
  }

  constructor() {
    super();
    this.attachShadow({ mode: "open" });

    this.shadowRoot.innerHTML = `
      <style>
        .input-container {
          display: flex;
          flex-direction: column;
        }

        label {
          font-size: 14px;
          font-weight: 500;
        }

        .input-field {
          display: flex;
          align-items: center;
          gap: 8px;
          background: #fff;
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

        .error-msg {
          color: red;
          font-size: 12px;
          min-height: 16px;
        }
      </style>

      <div class="input-container">
        <label></label>
        <div class="input-field">
          <img />
          <input />
        </div>
        <div class="error-msg"></div>
      </div>
    `;

    this.labelEl = this.shadowRoot.querySelector("label");
    this.imgEl = this.shadowRoot.querySelector("img");
    this.inputEl = this.shadowRoot.querySelector("input");
    this.errorEl = this.shadowRoot.querySelector(".error-msg");

    // Validate on input
    this.inputEl.addEventListener("input", () => this.validate());
  }

  // Expose value
  get value() {
    return this.inputEl.value;
  }

  set value(val) {
    this.inputEl.value = val;
    this.validate();
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
      case "name":
        this.inputEl.name = newValue || "";
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
        this.inputEl.value = newValue || "";
        break;
      case "required":
        if (newValue !== null) this.inputEl.setAttribute("required", "");
        else this.inputEl.removeAttribute("required");
        break;
    }
  }

  // ✅ General validation function
  validate() {
    const value = this.inputEl.value.trim();
    const type = this.inputEl.type;
    let msg = "";

    // Required check
    if (this.inputEl.required && !value) {
      msg = "This field is required";
    } else if (value) {
      const validators = {
        email: val => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val) || "Please enter a valid email",
        password: val => val.length >= 6 || "Password must be at least 6 characters",
        number: val => !isNaN(val) || "Please enter a valid number",
        url: val => /^(https?:\/\/[^\s]+)$/.test(val) || "Please enter a valid URL",
        text: val => true,
      };

      if (validators[type]) {
        const result = validators[type](value);
        if (result !== true) msg = result;
      }
    }

    this.errorEl.textContent = msg;
    return msg === ""; // true if valid
  }
}

customElements.define("input-component", InputComponent);
