class SidebarButtonComponent extends HTMLElement {
  static get observedAttributes() { return ["text", "icon", "id"]; }

  constructor() {
    super();
    this.attachShadow({ mode: "open" });

    this.shadowRoot.innerHTML = `
      <style>
        :host {
          display: flex;
          width: 100%;
        }

        .sidebar-btn-container {
          display: flex;
          align-items: center;
          justify-content: flex-start;
          gap: 8px;
          padding:0 20px;
          border-radius: 6px;
          background: #fff;
          color: #000;
          cursor: pointer;
          width: 100%;
          min-height: 40px;
          transition: background 0.2s, color 0.2s;
        }

        .sidebar-btn-container img {
          width: 20px;
          height: 20px;
        }

        .sidebar-btn-container span {
          line-height: 1;
        }

        /* Hover effect */
        .sidebar-btn-container:hover {
          background-color: #f9fafb;
          color: #fff;
        }

        /* Active state */
        .sidebar-btn-container.active {
          color: #155dfc;             /* blue text */
          background-color:  #eff5fcff;
        }
      </style>

      <div class="sidebar-btn-container">
        <img alt="">
        <span></span>
      </div>
    `;

    this.textEl = this.shadowRoot.querySelector("span");
    this.imgEl = this.shadowRoot.querySelector("img");
    this.btnEl = this.shadowRoot.querySelector(".sidebar-btn-container");
  }

  connectedCallback() {
    this._updateFromAttributes();

    this.btnEl.addEventListener("click", () => {
      // Find the top-level sidebar container
      const sidebarContainer = this.closest(".sidebar-area");

      if (sidebarContainer) {
        // Remove active from all buttons in the sidebar
        const allButtons = sidebarContainer.querySelectorAll("sidebar-btn-component");
        allButtons.forEach(btn => {
          btn.shadowRoot.querySelector(".sidebar-btn-container").classList.remove("active");
        });
      }

      // Activate this button
      this.btnEl.classList.add("active");

      // Dispatch click for external listeners
      this.dispatchEvent(new MouseEvent("click", { bubbles: true, composed: true }));
    });
  }

  attributeChangedCallback(name, oldVal, newVal) {
    this._updateAttr(name, newVal);
  }

  _updateFromAttributes() {
    this._updateAttr("text", this.getAttribute("text"));
    this._updateAttr("icon", this.getAttribute("icon"));
    this._updateAttr("id", this.getAttribute("id"));
  }

  _updateAttr(name, value) {
    switch (name) {
      case "text":
        this.textEl.textContent = value ?? "";
        this.textEl.style.display = value ? "inline-block" : "none";
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
      case "id":
        if (value) this.btnEl.id = value;
        else this.btnEl.removeAttribute("id");
        break;
    }
  }
}

customElements.define("sidebar-btn-component", SidebarButtonComponent);
