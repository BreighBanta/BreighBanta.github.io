// ===== your existing elements (renamed number -> numberEl) =====
let numberEl = document.getElementById("number");
const lowerButton = document.getElementById("lowerButton");
const addButton   = document.getElementById("addButton");
const resetButton = document.getElementById("resetButton");

// ===== new elements for goal/progress =====
const goalInput    = document.getElementById("goalInput");
const setGoalBtn   = document.getElementById("setGoalBtn");
const clearGoalBtn = document.getElementById("clearGoalBtn");
const progressBar  = document.getElementById("progressBar");
const progressPct  = document.getElementById("progressPct");
const goalLabel    = document.getElementById("goalLabel");
const goalMsg      = document.getElementById("goalMsg");
const goalBox      = document.querySelector(".goal-box");

// ===== state =====
let counter = 0;
let goal = null; // when set, used to compute %

// ===== helpers =====
function changeColor() {
  if (counter < 0) {
    numberEl.style.color = "red";
  } else if (counter > 0) {
    numberEl.style.color = "green";
  } else {
    numberEl.style.color = "gray";
  }
}

function announce(msg) {
  if (goalMsg) goalMsg.textContent = msg;
}

function updateProgress({ jump=false } = {}) {
  if (goal == null || goal <= 0) {
    if (progressBar) progressBar.style.width = "0%";
    if (progressPct) progressPct.textContent = "0%";
    return;
  }
  const pct = Math.max(0, Math.min(100, Math.round((counter / goal) * 100)));

  if (progressBar) {
    progressBar.style.transition = jump ? "none" : "width 220ms ease";
    progressBar.style.width = pct + "%";
    if (jump) requestAnimationFrame(() => progressBar.style.transition = "width 220ms ease");
  }
  if (progressPct) progressPct.textContent = pct + "%";

  if (counter >= goal) {
    goalBox?.classList.add("goal-reached");
    announce("🎉 Goal reached!");
  } else {
    goalBox?.classList.remove("goal-reached");
  }
}

function setGoalValue(n) {
  const val = Number(n);
  if (!Number.isFinite(val) || val <= 0) {
    announce("Please enter a positive number for the goal.");
    return;
  }
  goal = Math.floor(val);
  if (goalLabel) goalLabel.textContent = `Target: ${goal}`;
  updateProgress({ jump: true });
}

function clearGoal() {
  goal = null;
  if (goalLabel) goalLabel.textContent = "No goal set";
  if (progressBar) progressBar.style.width = "0%";
  if (progressPct) progressPct.textContent = "0%";
  goalBox?.classList.remove("goal-reached");
  announce("Goal cleared.");
}

// ===== events =====
addButton.addEventListener("click", () => {
  counter++;
  numberEl.textContent = counter;
  changeColor();
  updateProgress();
});

lowerButton.addEventListener("click", () => {
  counter--;
  numberEl.textContent = counter;
  changeColor();
  updateProgress();
});

resetButton.addEventListener("click", () => {
  counter = 0;
  numberEl.textContent = 0;
  changeColor();
  updateProgress();
});

// goal controls
setGoalBtn.addEventListener("click", () => setGoalValue(goalInput.value));
clearGoalBtn.addEventListener("click", clearGoal);
goalInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") setGoalValue(goalInput.value);
});

// initial paint
numberEl.textContent = counter;
changeColor();
updateProgress({ jump: true });
