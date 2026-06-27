const bootScreen = document.getElementById("bootScreen");
const countdownScreen = document.getElementById("countdownScreen");
const birthdayScreen = document.getElementById("birthdayScreen");
const prologueScreen = document.getElementById("prologueScreen");
const chapterOneScreen = document.getElementById("chapterOneScreen");

const daysEl = document.getElementById("days");
const hoursEl = document.getElementById("hours");
const minutesEl = document.getElementById("minutes");
const secondsEl = document.getElementById("seconds");

const bootLinesEl = document.getElementById("bootLines");
const bootProgress = document.getElementById("bootProgress");
const progressNumber = document.getElementById("progressNumber");
const bootStatus = document.getElementById("bootStatus");
const enteringText = document.getElementById("enteringText");
const confettiContainer = document.getElementById("confettiContainer");

const testMode = true;

let birthdayDate;
let countdownInterval;
let currentBootStep = 0;
let prologueAlreadyTyped = false;

const bootSteps = [
  { text: "Inicializando núcleo do sistema...", status: "[OK]", progress: 8 },
  { text: "Verificando conexão neural RGB...", status: "[OK]", progress: 17 },
  { text: "Carregando partículas neon...", status: "[OK]", progress: 26 },
  { text: "Sincronizando data especial...", status: "[OK]", progress: 38 },
  { text: "Localizando memórias importantes...", status: "[OK]", progress: 49 },
  { text: "Preparando arquivos secretos...", status: "[OK]", progress: 61 },
  { text: "Ativando modo surpresa...", status: "[OK]", progress: 73 },
  { text: "Carregando mensagens especiais...", status: "[OK]", progress: 84 },
  { text: "Validando acesso do aniversariante...", status: "[OK]", progress: 93 },
  { text: "Sistema pronto para inicialização.", status: "[READY]", progress: 100 },
];

function showScreen(screen) {
  document.querySelectorAll(".screen").forEach((item) => {
    item.classList.remove("active");
  });

  screen.classList.add("active");
}

function startBootSequence() {
  const interval = setInterval(() => {
    const step = bootSteps[currentBootStep];

    const line = document.createElement("div");
    line.classList.add("boot-line");

    line.innerHTML = `
      <span>[${String(currentBootStep + 1).padStart(2, "0")}]</span>
      <p>${step.text}</p>
      <b>${step.status}</b>
    `;

    bootLinesEl.appendChild(line);

    bootProgress.style.width = step.progress + "%";
    progressNumber.textContent = step.progress + "%";
    bootStatus.innerHTML = `${step.text}<span class="blink">_</span>`;

    currentBootStep++;

    if (currentBootStep >= bootSteps.length) {
      clearInterval(interval);

      setTimeout(() => {
        bootStatus.innerHTML = `Inicialização concluída<span class="blink">_</span>`;
        enteringText.classList.remove("hidden");
        enteringText.classList.add("show");
      }, 500);

      setTimeout(() => {
        showScreen(countdownScreen);
        startCountdown();
      }, 2300);
    }
  }, 650);
}

function startCountdown() {
  birthdayDate = testMode
    ? new Date(Date.now() + 10000)
    : new Date(2026, 6, 10, 0, 0, 0);

  updateCountdown();
  countdownInterval = setInterval(updateCountdown, 1000);
}

function updateCountdown() {
  const now = new Date();
  const distance = birthdayDate - now;

  if (distance <= 0) {
    daysEl.textContent = "00";
    hoursEl.textContent = "00";
    minutesEl.textContent = "00";
    secondsEl.textContent = "00";

    clearInterval(countdownInterval);
    showScreen(birthdayScreen);
    startConfetti();
    return;
  }

  const days = Math.floor(distance / (1000 * 60 * 60 * 24));
  const hours = Math.floor((distance / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((distance / (1000 * 60)) % 60);
  const seconds = Math.floor((distance / 1000) % 60);

  daysEl.textContent = String(days).padStart(2, "0");
  hoursEl.textContent = String(hours).padStart(2, "0");
  minutesEl.textContent = String(minutes).padStart(2, "0");
  secondsEl.textContent = String(seconds).padStart(2, "0");
}

function startConfetti() {
  if (!confettiContainer) return;

  confettiContainer.innerHTML = "";

  const colors = ["#00eaff", "#8d2cff", "#ffffff", "#00ff99", "#ff4fd8"];

  for (let i = 0; i < 120; i++) {
    const piece = document.createElement("div");
    piece.classList.add("confetti");

    piece.style.left = Math.random() * 100 + "vw";
    piece.style.background = colors[Math.floor(Math.random() * colors.length)];
    piece.style.animationDuration = 2.5 + Math.random() * 2.5 + "s";
    piece.style.animationDelay = Math.random() * 0.8 + "s";
    piece.style.transform = `rotate(${Math.random() * 360}deg)`;

    confettiContainer.appendChild(piece);

    setTimeout(() => {
      piece.remove();
    }, 6000);
  }
}

function typeText(element, text, speed = 45) {
  return new Promise((resolve) => {
    element.textContent = "";
    const words = text.split(" ");
    let index = 0;

    const interval = setInterval(() => {
      element.textContent += (index === 0 ? "" : " ") + words[index];
      index++;

      if (index >= words.length) {
        clearInterval(interval);
        resolve();
      }
    }, speed * 3);
  });
}

async function startPrologueTyping() {
  if (prologueAlreadyTyped) return;
  prologueAlreadyTyped = true;

  const elements = document.querySelectorAll(".type-word");
  const btn = document.getElementById("prologueBtn");

  btn.classList.remove("show");

  for (const el of elements) {
    const text = el.getAttribute("data-text");
    await typeText(el, text, 45);
    await new Promise((resolve) => setTimeout(resolve, 450));
  }

  btn.classList.add("show");
}

function startSurprise() {
  showScreen(prologueScreen);
  startPrologueTyping();
}

function nextChapter() {
  showScreen(chapterOneScreen);
}

function nextChapterTwo() {
  alert("Aqui entra o Capítulo 02 com vídeo, mano.");
}

startBootSequence();