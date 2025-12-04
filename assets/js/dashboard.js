// Load all components with data-import attribute
const activeUser = localStorage.getItem("activeUser");

if (!activeUser) {
  window.location.href = "/index.html";
}


async function renderComponents(elements) {
  for (const element of elements) {
    const path = element.getAttribute("data-import");

    try {
      const res = await fetch(path);
      if (!res.ok) throw new Error("Component not found");

      const html = await res.text();
      element.innerHTML = html;

      reloadScripts(element);

      // Load nested components (recursive support)
      const children = element.querySelectorAll("[data-import]");
      if (children.length > 0) {
        await renderComponents(children);
      }

      // Initialize dashboard switching after sidebar loads
      initDashboardSwitching();

    } catch (err) {
      element.innerHTML = "<h4>Component not found</h4>";
      console.error("Error loading:", path, err);
    }
  }
}

// Reload JS inside loaded components
function reloadScripts(container) {
  const scripts = container.querySelectorAll("script");

  scripts.forEach(oldScript => {
    const newScript = document.createElement("script");

    if (oldScript.src) {
      newScript.src = oldScript.src;
    } else {
      newScript.textContent = oldScript.textContent;
    }

    oldScript.replaceWith(newScript);
  });
}

// Initialize components
document.addEventListener("DOMContentLoaded", () => {
  const components = document.querySelectorAll("[data-import]");
  renderComponents(components);
});


// ========== DASHBOARD ROUTING LOGIC ==========
function initDashboardSwitching() {

  const dashboardBtn = document.getElementById("dashboard-btn");
  const taskBtn = document.getElementById("task-btn");
  const communityBtn = document.getElementById("community-btn");

  const dashboardContent = document.getElementById("dashboard-content");
  const taskContent = document.getElementById("task-content");
  const communityContent = document.getElementById("community-content");

  // Wait until sidebar is loaded
  if (!dashboardBtn || !taskBtn || !communityBtn) return;

  const buttons = [dashboardBtn, taskBtn, communityBtn];
  const contents = [dashboardContent, taskContent, communityContent];

  function resetView() {
    contents.forEach(c => c.classList.remove("active"));
    buttons.forEach(b => b.classList.remove("active"));
  }

  dashboardBtn.onclick = () => {
    resetView();
    dashboardContent.classList.add("active");
    dashboardBtn.classList.add("active");
  };

  taskBtn.onclick = () => {
    resetView();
    taskContent.classList.add("active");
    taskBtn.classList.add("active");
  };

  communityBtn.onclick = () => {
    resetView();
    communityContent.classList.add("active");
    communityBtn.classList.add("active");
  };

  // Auto-activate Dashboard if nothing is selected
  if (!buttons.some(btn => btn.classList.contains("active"))) {
    dashboardBtn.click();
  }
}
