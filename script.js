function openStartMenu() {
  document.getElementById("startMenu").classList.add("active");
}

function closeStartMenu() {
  document.getElementById("startMenu").classList.remove("active");
}

function goHome() {
  switchScreen("mainMenu");
}

function openMessages() {
  switchScreen("messages");
}

function openDetail() {
  switchScreen("detail");
}

function openCredits() {
  switchScreen("credits");
}

function switchScreen(id) {
  document.querySelectorAll(".screen").forEach(s => s.classList.remove("active"));
  document.getElementById(id).classList.add("active");
}