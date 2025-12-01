class CardComponent extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    const title = this.getAttribute('title') || 'Card Title';
    const value = this.getAttribute('value') || '0';
    const subtext = this.getAttribute('subtext') || '';
    const icon = this.getAttribute('icon') || '';
    const iconBg = this.getAttribute('icon-bg') || '#155dfc'; 

    this.shadowRoot.innerHTML = `
      <style>
        .dashboard-card {
          background-color: #fff;
          border-radius: 12px;
          border: 1px solid oklch(0.872 0.01 258.338);
          padding: 20px;
          width: 200px;
          height: 135px;
          box-shadow: 0 2px 8px rgba(0,0,0,0.05);
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          font-family: ui-sans-serif, system-ui, sans-serif;
        }
        .card-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 12px;
        }

        .dashboard-card:hover {
          background-color: #fff;
          transform: translateY(-1.5px) scale(1.01);
          box-shadow: 0 8px 18px rgba(0,0,0,0.08);
        }
        .card-title {
          font-size: 14px;
          font-weight: 500;
          color: #333;
        }
        .card-icon img {
          width: 18px;
          height: 18px;
          border-radius: 6px;
          background-color: ${iconBg};
          padding: 4px;
        }
        .card-body {
          display: flex;
          flex-direction: column;
        }
        .card-value {
          font-size: 24px;
          font-weight: 600;
          margin: 0;
          color: #111;
        }
        .card-subtext {
          font-size: 12px;
          color: #666;
          margin-top: 2px;
        }
      </style>
      <div class="dashboard-card">
        <div class="card-header">
          <span class="card-title">${title}</span>
          <div class="card-icon">
            <img src="${icon}" alt="Icon">
          </div>
        </div>
        <div class="card-body">
          <h2 class="card-value">${value}</h2>
          <span class="card-subtext">${subtext}</span>
        </div>
      </div>
    `;
  }
}

// Define the component
customElements.define('card-component', CardComponent);
