const modal = document.getElementById("taskModal");
const addTaskBtn = document.getElementById("addTaskBtn");
const closeBtn = document.getElementById("closeModal");
const cancelBtn = document.getElementById("cancelTask");

// OPEN MODAL
addTaskBtn.addEventListener("click", () => {
  modal.style.display = "flex";
});

// CLOSE MODAL
closeBtn.addEventListener("click", () => modal.style.display = "none");
cancelBtn.addEventListener("click", () => modal.style.display = "none");
