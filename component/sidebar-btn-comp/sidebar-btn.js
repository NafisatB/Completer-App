class SidebarButtonComponent extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    const text = this.getAttribute('text') || '';
    const icon = this.getAttribute('icon') || '';
    const id = this.getAttribute('id') || '';

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
          margin: 0 10px;
          padding: 0 20px;
          border-radius: 6px;
          background: #fff;
          color: #000;
          cursor: pointer;
          width: 200px;
          min-height: 40px;
          transition: background 0.2s, color 0.2s;
        }
        .sidebar-btn-container img {
          width: 14px;
          height: 14px;
      
        }
        .sidebar-btn-container span {
          line-height: 1;
          font-size: 14px;
          font-weight: 500;
        }
        .sidebar-btn-container:hover {
          background-color: #f9fafb;
          color: #fff;
        }
        .sidebar-btn-container.active {
          color: #155dfc;
          background-color: #eff5fcff;
        }
      </style>

      <div class="sidebar-btn-container" ${id ? `id="${id}"` : ''}>
        ${icon ? `<img src="${icon}" alt="Icon">` : ''}
        ${text ? `<span>${text}</span>` : ''}
      </div>
    `;

    const btnEl = this.shadowRoot.querySelector('.sidebar-btn-container');

    btnEl.addEventListener('click', () => {
      const sidebarContainer = this.closest('.sidebar-area');
      if (sidebarContainer) {
        const allButtons = sidebarContainer.querySelectorAll('sidebar-btn-component');
        allButtons.forEach(btn => {
          btn.shadowRoot.querySelector('.sidebar-btn-container').classList.remove('active');
        });
      }
      btnEl.classList.add('active');

      this.dispatchEvent(new MouseEvent('click', { bubbles: true, composed: true }));
    });
  }
}

// Define the component
customElements.define('sidebar-btn-component', SidebarButtonComponent);
