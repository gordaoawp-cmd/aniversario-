const bootScreen = document.getElementById("bootScreen");
const countdownScreen = document.getElementById("countdownScreen");
const birthdayScreen = document.getElementById("birthdayScreen");
const prologueScreen = document.getElementById("prologueScreen");

const daysEl = document.getElementById("days");
const hoursEl = document.getElementById("hours");
const minutesEl = document.getElementById("minutes");
const secondsEl = document.getElementById("seconds");

const bootLinesEl = document.getElementById("bootLines");
const bootProgress = document.getElementById("bootProgress");
const progressNumber = document.getElementById("progressNumber");
const bootStatus = document.getElementById("bootStatus");
const enteringText = document.getElementById("enteringText");

/*
  MUDA A DATA AQUI:

  new Date(ANO, MÊS - 1, DIA, HORA, MINUTO, SEGUNDO)

  Exemplo abaixo:
  10 de julho de 2026 às 00:00
*/
const birthdayDate = new Date(2026, 6, 10, 0, 0, 0);

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

let currentBootStep = 0;

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
      }, 2300);
    }
  }, 650);
}

function showScreen(screen) {
  document.querySelectorAll(".screen").forEach((item) => {
    item.classList.remove("active");
  });

  screen.classList.add("active");
}

function updateCountdown() {
  const now = new Date();
  const distance = birthdayDate - now;

  if (distance <= 0) {
    showScreen(birthdayScreen);
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

function startSurprise() {
  showScreen(prologueScreen);
}

function nextChapter() {
  alert("Aqui entra o Capítulo 01, mano. A próxima parte a gente faz agora.");
}

startBootSequence();
updateCountdown();
setInterval(updateCountdown, 1000);