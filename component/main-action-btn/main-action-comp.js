class ActionButtonComponent extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    const title = this.getAttribute('title') || 'Menu Item';
    const subtext = this.getAttribute('subtext') || '';
    const iconColor = this.getAttribute('icon-color') || '#155dfc';
    const iconSVG = this.getAttribute('icon-svg') || '';
    const iconBg = this.getAttribute('icon-bg') || '#155dfc'; 

    // Default SVG fallback
    const defaultSVG = `
      <svg viewBox="0 0 24 24" fill="none" stroke="${iconColor}">
        <circle cx="12" cy="12" r="10" stroke-width="2"/>
        <path d="M12 6v6l4 2" stroke-width="2"/>
      </svg>
    `;

    // Wrap user SVG
    const svgContent = iconSVG
      ? `<svg viewBox="0 0 24 24" fill="none" stroke="${iconColor}">
           ${iconSVG}
         </svg>`
      : defaultSVG;

    this.shadowRoot.innerHTML = `
      <style>
        :host {
          display: block;
          width: 100%;
        }

        .action-btn {
          display: flex;
          align-self: stretch;
          justify-self: flex-start;
          gap: 12px;
          padding: 16px 16px;
          width: 430px;
          border: 1px solid oklch(0.872 0.01 258.338);
          border-radius: 8px;
          cursor: pointer;
          background: #fff;
          transition: background 0.2s ease, color 0.2s ease;
          font-family: ui-sans-serif, system-ui, sans-serif;
        }

        .action-btn:hover {
          background: oklch(65.553% 0.12168 223.444);
          color: #fff;
        }

        :host(.active) .action-btn {
          background: #eff5fc;
          color: ${iconColor};
        }

        .icon {
            width: 40px;           
            height: 40px;
            border-radius: 8px;
            background-color: ${iconBg};
            display: flex;
            align-items: center;
            justify-content: center;
        }

        .icon svg {
            width: 18px;           
            height: 18px;
            background: none;       /* IMPORTANT */
            padding: 0;             /* IMPORTANT */
            stroke: ${iconColor};
        }

        .text-wrap {
          display: flex;
          flex-direction: column;
          gap: 3px;
          line-height: 1.5;
        }

        .title {
          font-size: 14px;
          font-weight: 600;
        }

        .subtext {
          font-size: 11px;
          color: oklch(0.551 0.027 264.364);
        }
      </style>

      <div class="action-btn">
        <div class="icon">
          ${svgContent}
        </div>
        <div class="text-wrap">
          <span class="title">${title}</span>
          ${subtext ? `<span class="subtext">${subtext}</span>` : ''}
        </div>
      </div>
    `;

    const button = this.shadowRoot.querySelector('.action-btn');

    button.addEventListener('click', () => {
      const group = this.closest('.dashboard__container');

      if (group) {
        group.querySelectorAll('action-btn-component').forEach(btn => {
          btn.classList.remove('active');
        });
      }

      this.classList.add('active');

      this.dispatchEvent(new MouseEvent('click', { bubbles: true, composed: true }));
    });
  }
}

customElements.define('action-btn-component', ActionButtonComponent);
