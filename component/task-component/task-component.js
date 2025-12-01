class TaskComponent extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    const title = this.getAttribute('title') || 'Card Title';
    const iconColor = this.getAttribute('icon-color') || '#155dfc';
    const iconSVG = this.getAttribute('icon-svg') || ''; 

    // Fallback SVG if no icon provided
    const defaultSVG = `
      <svg viewBox="0 0 24 24" stroke="${iconColor}" fill="none">
        <circle cx="12" cy="12" r="10" stroke-width="2"/>
        <path d="M12 6v6l4 2" stroke-width="2"/>
      </svg>
    `;

    // If user provides icon-svg, wrap it inside <svg>
    const svgContent = iconSVG
      ? `<svg viewBox="0 0 24 24" stroke="${iconColor}" fill="none">
           ${iconSVG}
         </svg>`
      : defaultSVG;

    this.shadowRoot.innerHTML = `
      <style>
        .task-card {
          background-color: #fff;
          border-radius: 12px;
          border: 1px solid oklch(0.872 0.01 258.338);
          padding: 16px;
          width: 470px;
          height: 300px;
          box-shadow: 0 2px 8px rgba(0,0,0,0.05);
          display: flex;
          flex-direction: column;
          justify-content: flex-start;
          font-family: ui-sans-serif, system-ui, sans-serif;
        }
        .task-header {
          display: flex;
          align-items: center;
          margin-bottom: 12px;
          gap: 10px;
        }
        .task-title {
          font-size: 14px;
          font-weight: 500;
          color: #333;
        }
        .task-icon svg {
          width: 20px;
          height: 20px;
          stroke: ${iconColor};
        }

        .task-body {
            display: flex;
            align-items: flex-start;
            justify-content: flex-start;   /* ✅ NOT center */

        }
      </style>

      <div class="task-card">
        <div class="task-header">
          <div class="task-icon">
            ${svgContent}
          </div>
          <span class="task-title">${title}</span>
        </div>
        <div class="task-body">
        <slot></slot>
        </div>
      </div>
    `;
  }
}

customElements.define('dashboard-event', TaskComponent);
