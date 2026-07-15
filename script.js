const bootScreen = document.getElementById("bootScreen");
const countdownScreen = document.getElementById("countdownScreen");
const birthdayScreen = document.getElementById("birthdayScreen");
const prologueScreen = document.getElementById("prologueScreen");
const chapterOneScreen = document.getElementById("chapterOneScreen");
const chapterTwoScreen = document.getElementById("chapterTwoScreen");
const chapterThreeScreen = document.getElementById("chapterThreeScreen");
const caseScreen = document.getElementById("caseScreen");
const firstGiftRevealScreen = document.getElementById(
  "firstGiftRevealScreen"
);
const secondVideoScreen = document.getElementById(
  "secondVideoScreen"
);
const secondGiftIntroScreen = document.getElementById(
  "secondGiftIntroScreen"
);
const thirdVideoScreen = document.getElementById(
  "thirdVideoScreen"
);
const secondCaseScreen = document.getElementById(
  "secondCaseScreen"
);
const secondGiftScreen = document.getElementById("secondGiftScreen");
const secondGiftMessageScreen = document.getElementById(
  "secondGiftMessageScreen"
);
const fourthVideoScreen = document.getElementById(
  "fourthVideoScreen"
);
const finalGiftIntroScreen = document.getElementById(
  "finalGiftIntroScreen"
);
const finalCaseScreen = document.getElementById("finalCaseScreen");
const thirdGiftScreen = document.getElementById("thirdGiftScreen");
const finalMessageScreen = document.getElementById(
  "finalMessageScreen"
);
const finalVideoScreen = document.getElementById("finalVideoScreen");
const endingScreen = document.getElementById("endingScreen");

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

/*
  true = libera o site após 10 segundos.
  false = usa a data real do aniversário.
*/
const testMode = false;

let birthdayDate;
let countdownInterval;
let currentBootStep = 0;
let prologueAlreadyTyped = false;
let caseIsOpening = false;
let secondCaseIsOpening = false;
let finalCaseIsOpening = false;

const bootSteps = [
  {
    text: "Inicializando núcleo do sistema...",
    status: "[OK]",
    progress: 8,
  },
  {
    text: "Verificando conexão neural RGB...",
    status: "[OK]",
    progress: 17,
  },
  {
    text: "Carregando partículas neon...",
    status: "[OK]",
    progress: 26,
  },
  {
    text: "Sincronizando data especial...",
    status: "[OK]",
    progress: 38,
  },
  {
    text: "Localizando memórias importantes...",
    status: "[OK]",
    progress: 49,
  },
  {
    text: "Preparando arquivos secretos...",
    status: "[OK]",
    progress: 61,
  },
  {
    text: "Ativando modo surpresa...",
    status: "[OK]",
    progress: 73,
  },
  {
    text: "Carregando mensagens especiais...",
    status: "[OK]",
    progress: 84,
  },
  {
    text: "Validando acesso do aniversariante...",
    status: "[OK]",
    progress: 93,
  },
  {
    text: "Sistema pronto para inicialização.",
    status: "[READY]",
    progress: 100,
  },
];

const rouletteItems = [
  {
    name: "PC Gamer",
    icon: "🖥️",
    rarity: "red",
  },
  {
    name: "Ventilador",
    icon: "🌬️",
    rarity: "blue",
  },
  {
    name: "Samsung S1000",
    icon: "📱",
    rarity: "purple",
  },
  {
    name: "Presente secreto",
    icon: "🎁",
    rarity: "gold",
    winner: true,
  },
  {
    name: "Headset gamer",
    icon: "🎧",
    rarity: "blue",
  },
  {
    name: "Teclado mecânico",
    icon: "⌨️",
    rarity: "blue",
  },
  {
    name: "Mouse gamer",
    icon: "🖱️",
    rarity: "blue",
  },
  {
    name: "Kit com 4 Prism 6 Pro",
    icon: "✨",
    rarity: "gold",
  },
];

const secondRouletteItems = [
  {
    name: "Fita LED RGB",
    icon: "✨",
    rarity: "blue",
  },
  {
    name: "Controle RGB",
    icon: "🎛️",
    rarity: "purple",
  },
  {
    name: "Kit de fans RGB",
    icon: "🌈",
    rarity: "green",
  },
  {
    name: "Teclado RGB",
    icon: "⌨️",
    rarity: "blue",
  },
  {
    name: "Mousepad RGB",
    icon: "🖱️",
    rarity: "purple",
  },
  {
    name: "RGB encontrado",
    icon: "🌈",
    rarity: "gold",
    winner: true,
  },
  {
    name: "Gabinete RGB",
    icon: "🖥️",
    rarity: "red",
  },
  {
    name: "Setup completo RGB",
    icon: "💻",
    rarity: "red",
  },
];

const finalRouletteItems = [
  {
    name: "Cadeira gamer",
    icon: "🪑",
    rarity: "red",
  },
  {
    name: "Monitor gamer",
    icon: "🖥️",
    rarity: "purple",
  },
  {
    name: "Placa de vídeo",
    icon: "🎮",
    rarity: "red",
  },
  {
    name: "Upgrade secreto",
    icon: "⚡",
    rarity: "blue",
  },
  {
    name: "Presente lendário",
    icon: "👑",
    rarity: "gold",
    winner: true,
  },
  {
    name: "Headset RGB",
    icon: "🎧",
    rarity: "purple",
  },
  {
    name: "Setup dos sonhos",
    icon: "💻",
    rarity: "gold",
  },
  {
    name: "Arquivo surpresa",
    icon: "🎁",
    rarity: "blue",
  },
];

function showScreen(screen) {
  if (!screen) {
    console.error(
      "Tela não encontrada. Confira se o ID do HTML está correto."
    );
    return;
  }

  document.querySelectorAll(".screen").forEach((item) => {
    item.classList.remove("active");
  });

  screen.classList.add("active");

  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
}

function startBootSequence() {
  if (
    !bootLinesEl ||
    !bootProgress ||
    !progressNumber ||
    !bootStatus ||
    !enteringText
  ) {
    console.error(
      "Um elemento da tela de inicialização não foi encontrado."
    );
    return;
  }

  const bootInterval = setInterval(() => {
    const step = bootSteps[currentBootStep];

    if (!step) {
      clearInterval(bootInterval);
      return;
    }

    const line = document.createElement("div");
    line.classList.add("boot-line");

    line.innerHTML = `
      <span>[${String(currentBootStep + 1).padStart(2, "0")}]</span>
      <p>${step.text}</p>
      <b>${step.status}</b>
    `;

    bootLinesEl.appendChild(line);

    bootProgress.style.width = `${step.progress}%`;
    progressNumber.textContent = `${step.progress}%`;

    bootStatus.innerHTML = `
      ${step.text}<span class="blink">_</span>
    `;

    currentBootStep++;

    if (currentBootStep >= bootSteps.length) {
      clearInterval(bootInterval);

      setTimeout(() => {
        bootStatus.innerHTML =
          'Inicialização concluída<span class="blink">_</span>';

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
    : new Date(2026, 6, 29, 19, 0, 0);

  updateCountdown();

  countdownInterval = setInterval(updateCountdown, 1000);
}

function updateCountdown() {
  if (!birthdayDate) {
    return;
  }

  const now = new Date();
  const distance = birthdayDate.getTime() - now.getTime();

  if (distance <= 0) {
    if (daysEl) daysEl.textContent = "00";
    if (hoursEl) hoursEl.textContent = "00";
    if (minutesEl) minutesEl.textContent = "00";
    if (secondsEl) secondsEl.textContent = "00";

    clearInterval(countdownInterval);

    showScreen(birthdayScreen);
    startConfetti();

    return;
  }

  const days = Math.floor(
    distance / (1000 * 60 * 60 * 24)
  );

  const hours = Math.floor(
    (distance / (1000 * 60 * 60)) % 24
  );

  const minutes = Math.floor(
    (distance / (1000 * 60)) % 60
  );

  const seconds = Math.floor(
    (distance / 1000) % 60
  );

  if (daysEl) {
    daysEl.textContent = String(days).padStart(2, "0");
  }

  if (hoursEl) {
    hoursEl.textContent = String(hours).padStart(2, "0");
  }

  if (minutesEl) {
    minutesEl.textContent = String(minutes).padStart(2, "0");
  }

  if (secondsEl) {
    secondsEl.textContent = String(seconds).padStart(2, "0");
  }
}

function startConfetti() {
  if (!confettiContainer) {
    return;
  }

  confettiContainer.innerHTML = "";

  const colors = [
    "#00eaff",
    "#8d2cff",
    "#ffffff",
    "#00ff99",
    "#ff4fd8",
    "#f5b942",
  ];

  for (let i = 0; i < 120; i++) {
    const piece = document.createElement("div");

    piece.classList.add("confetti");

    piece.style.left = `${Math.random() * 100}vw`;

    piece.style.background =
      colors[Math.floor(Math.random() * colors.length)];

    piece.style.animationDuration =
      `${2.5 + Math.random() * 2.5}s`;

    piece.style.animationDelay =
      `${Math.random() * 0.8}s`;

    piece.style.transform =
      `rotate(${Math.random() * 360}deg)`;

    confettiContainer.appendChild(piece);

    setTimeout(() => {
      piece.remove();
    }, 6000);
  }
}

function typeText(element, text, speed = 45) {
  return new Promise((resolve) => {
    if (!element) {
      resolve();
      return;
    }

    element.textContent = "";

    const words = text.split(" ");
    let index = 0;

    const typingInterval = setInterval(() => {
      const space = index === 0 ? "" : " ";

      element.textContent += `${space}${words[index]}`;

      index++;

      if (index >= words.length) {
        clearInterval(typingInterval);
        resolve();
      }
    }, speed * 3);
  });
}

async function startPrologueTyping() {
  if (prologueAlreadyTyped) {
    return;
  }

  prologueAlreadyTyped = true;

  const elements = document.querySelectorAll(".type-word");
  const button = document.getElementById("prologueBtn");

  if (button) {
    button.classList.remove("show");
  }

  for (const element of elements) {
    const text = element.getAttribute("data-text") || "";

    await typeText(element, text, 45);

    await new Promise((resolve) => {
      setTimeout(resolve, 450);
    });
  }

  if (button) {
    button.classList.add("show");
  }
}

function startSurprise() {
  showScreen(prologueScreen);
  startPrologueTyping();
}

function nextChapter() {
  showScreen(chapterOneScreen);
}

function nextChapterTwo() {
  showScreen(chapterTwoScreen);

  const firstVideo = document.getElementById("firstVideo");

  if (firstVideo) {
    firstVideo.pause();
    firstVideo.currentTime = 0;
  }
}

function nextChapterThree() {
  const firstVideo = document.getElementById("firstVideo");

  if (firstVideo) {
    firstVideo.pause();
  }

  showScreen(chapterThreeScreen);
}

function openCaseScreen() {
  resetCase();
  showScreen(caseScreen);
}

function resetCase() {
  const caseButton = document.getElementById("caseButton");
  const rouletteArea = document.getElementById("rouletteArea");
  const rouletteTrack = document.getElementById("rouletteTrack");
  const rouletteStatus = document.getElementById("rouletteStatus");
  const prizeResult = document.getElementById("prizeResult");

  caseIsOpening = false;

  if (caseButton) {
    caseButton.disabled = false;
    caseButton.classList.remove("hidden");
  }

  if (rouletteArea) {
    rouletteArea.classList.add("hidden");
  }

  if (prizeResult) {
    prizeResult.classList.add("hidden");
  }

  if (rouletteTrack) {
    rouletteTrack.innerHTML = "";
    rouletteTrack.style.transition = "none";
    rouletteTrack.style.transform = "translateX(0px)";
  }

  if (rouletteStatus) {
    rouletteStatus.textContent = "Preparando abertura...";
  }
}

function createRouletteItems() {
  const rouletteTrack = document.getElementById("rouletteTrack");

  if (!rouletteTrack) {
    return;
  }

  rouletteTrack.innerHTML = "";

  const totalRounds = 10;
  const winnerRound = 8;

  for (let round = 0; round < totalRounds; round++) {
    rouletteItems.forEach((item) => {
      const itemElement = document.createElement("div");

      itemElement.className =
        `roulette-item ${item.rarity}`;

      if (round === winnerRound && item.winner) {
        itemElement.dataset.finalWinner = "true";
      }

      itemElement.innerHTML = `
        <div class="item-icon">${item.icon}</div>
        <span>${item.name}</span>
      `;

      rouletteTrack.appendChild(itemElement);
    });
  }
}

function openCase() {
  if (caseIsOpening) {
    return;
  }

  const caseButton = document.getElementById("caseButton");
  const rouletteArea = document.getElementById("rouletteArea");
  const rouletteTrack = document.getElementById("rouletteTrack");
  const rouletteStatus = document.getElementById("rouletteStatus");
  const prizeResult = document.getElementById("prizeResult");
  const rouletteWindow = document.querySelector(".roulette-window");

  if (
    !caseButton ||
    !rouletteArea ||
    !rouletteTrack ||
    !rouletteStatus ||
    !prizeResult ||
    !rouletteWindow
  ) {
    console.error(
      "Um elemento da caixa ou da roleta não foi encontrado."
    );
    return;
  }

  caseIsOpening = true;

  caseButton.disabled = true;
  caseButton.classList.add("hidden");

  prizeResult.classList.add("hidden");
  rouletteArea.classList.remove("hidden");

  createRouletteItems();

  rouletteStatus.textContent = "ABRINDO CAIXA...";

  rouletteTrack.style.transition = "none";
  rouletteTrack.style.transform = "translateX(0px)";

  requestAnimationFrame(() => {
    const winnerElement = rouletteTrack.querySelector(
      '[data-final-winner="true"]'
    );

    if (!winnerElement) {
      console.error("O prêmio vencedor não foi encontrado.");

      caseIsOpening = false;
      return;
    }

    const rouletteWindowWidth = rouletteWindow.offsetWidth;
    const winnerCenter =
      winnerElement.offsetLeft +
      winnerElement.offsetWidth / 2;

    const finalPosition =
      winnerCenter - rouletteWindowWidth / 2;

    requestAnimationFrame(() => {
      rouletteTrack.style.transition =
        "transform 6s cubic-bezier(0.08, 0.72, 0.12, 1)";

      rouletteTrack.style.transform =
        `translateX(-${finalPosition}px)`;
    });
  });

  setTimeout(() => {
    rouletteStatus.textContent =
      "DIMINUINDO VELOCIDADE...";
  }, 3500);

  setTimeout(() => {
    rouletteStatus.textContent =
      "✨ ITEM RARO ENCONTRADO! ✨";

    startConfetti();
  }, 6100);

  setTimeout(() => {
    rouletteArea.classList.add("hidden");
    prizeResult.classList.remove("hidden");

    caseIsOpening = false;

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, 7000);
}

function openFirstGiftReveal() {
  showScreen(firstGiftRevealScreen);
  startConfetti();
}

function openSecondVideo() {
  if (!secondVideoScreen) {
    console.error(
      'A tela "secondVideoScreen" não foi encontrada no HTML.'
    );
    return;
  }

  showScreen(secondVideoScreen);

  const secondVideo = document.getElementById("secondVideo");

  if (secondVideo) {
    secondVideo.pause();
    secondVideo.currentTime = 0;
  } else {
    console.error(
      'O vídeo com id "secondVideo" não foi encontrado no HTML.'
    );
  }
}

function openSecondGiftIntro() {
  const secondVideo = document.getElementById("secondVideo");

  if (secondVideo) {
    secondVideo.pause();
  }

  showScreen(secondGiftIntroScreen);
}

function openThirdVideo() {
  if (!thirdVideoScreen) {
    console.error(
      'A tela "thirdVideoScreen" não foi encontrada no HTML.'
    );
    return;
  }

  showScreen(thirdVideoScreen);

  const thirdVideo = document.getElementById("thirdVideo");

  if (thirdVideo) {
    thirdVideo.pause();
    thirdVideo.currentTime = 0;
  } else {
    console.error(
      'O vídeo com id "thirdVideo" não foi encontrado no HTML.'
    );
  }
}

function openSecondMoneyCaseScreen() {
  const thirdVideo = document.getElementById("thirdVideo");

  if (thirdVideo) {
    thirdVideo.pause();
  }

  resetSecondMoneyCase();
  showScreen(secondCaseScreen);
}

function resetSecondMoneyCase() {
  const moneyCaseButton = document.getElementById("moneyCaseButton");
  const secondRouletteArea = document.getElementById(
    "secondRouletteArea"
  );
  const secondRouletteTrack = document.getElementById(
    "secondRouletteTrack"
  );
  const secondRouletteStatus = document.getElementById(
    "secondRouletteStatus"
  );
  const secondPrizeResult = document.getElementById(
    "secondPrizeResult"
  );

  secondCaseIsOpening = false;

  if (moneyCaseButton) {
    moneyCaseButton.disabled = false;
    moneyCaseButton.classList.remove("hidden");
  }

  if (secondRouletteArea) {
    secondRouletteArea.classList.add("hidden");
  }

  if (secondPrizeResult) {
    secondPrizeResult.classList.add("hidden");
  }

  if (secondRouletteTrack) {
    secondRouletteTrack.innerHTML = "";
    secondRouletteTrack.style.transition = "none";
    secondRouletteTrack.style.transform = "translateX(0px)";
  }

  if (secondRouletteStatus) {
    secondRouletteStatus.textContent = "Preparando análise...";
  }
}

function createSecondRouletteItems() {
  const secondRouletteTrack = document.getElementById(
    "secondRouletteTrack"
  );

  if (!secondRouletteTrack) {
    return;
  }

  secondRouletteTrack.innerHTML = "";

  const totalRounds = 10;
  const winnerRound = 8;

  for (let round = 0; round < totalRounds; round++) {
    secondRouletteItems.forEach((item) => {
      const itemElement = document.createElement("div");

      itemElement.className =
        `roulette-item ${item.rarity}`;

      if (round === winnerRound && item.winner) {
        itemElement.dataset.finalWinner = "true";
      }

      itemElement.innerHTML = `
        <div class="item-icon">${item.icon}</div>
        <span>${item.name}</span>
      `;

      secondRouletteTrack.appendChild(itemElement);
    });
  }
}

function openSecondMoneyCase() {
  if (secondCaseIsOpening) {
    return;
  }

  const moneyCaseButton = document.getElementById("moneyCaseButton");
  const secondRouletteArea = document.getElementById(
    "secondRouletteArea"
  );
  const secondRouletteTrack = document.getElementById(
    "secondRouletteTrack"
  );
  const secondRouletteStatus = document.getElementById(
    "secondRouletteStatus"
  );
  const secondPrizeResult = document.getElementById(
    "secondPrizeResult"
  );
  const rouletteWindow =
    secondRouletteArea?.querySelector(".roulette-window");

  if (
    !moneyCaseButton ||
    !secondRouletteArea ||
    !secondRouletteTrack ||
    !secondRouletteStatus ||
    !secondPrizeResult ||
    !rouletteWindow
  ) {
    console.error(
      "Elementos da segunda abertura não foram encontrados."
    );
    return;
  }

  secondCaseIsOpening = true;

  moneyCaseButton.disabled = true;
  moneyCaseButton.classList.add("hidden");

  secondPrizeResult.classList.add("hidden");
  secondRouletteArea.classList.remove("hidden");

  createSecondRouletteItems();

  secondRouletteStatus.textContent = "ANALISANDO COMPONENTE RGB...";

  secondRouletteTrack.style.transition = "none";
  secondRouletteTrack.style.transform = "translateX(0px)";

  requestAnimationFrame(() => {
    const winnerElement = secondRouletteTrack.querySelector(
      '[data-final-winner="true"]'
    );

    if (!winnerElement) {
      console.error(
        "O item vencedor da segunda roleta não foi encontrado."
      );
      secondCaseIsOpening = false;
      return;
    }

    const rouletteWindowWidth = rouletteWindow.offsetWidth;
    const winnerCenter =
      winnerElement.offsetLeft +
      winnerElement.offsetWidth / 2;

    const finalPosition =
      winnerCenter - rouletteWindowWidth / 2;

    requestAnimationFrame(() => {
      secondRouletteTrack.style.transition =
        "transform 6s cubic-bezier(0.08, 0.72, 0.12, 1)";

      secondRouletteTrack.style.transform =
        `translateX(-${finalPosition}px)`;
    });
  });

  setTimeout(() => {
    secondRouletteStatus.textContent =
      "FINALIZANDO ANÁLISE RGB...";
  }, 3500);

  setTimeout(() => {
    secondRouletteStatus.textContent =
      "🌈 RGB IDENTIFICADO COM SUCESSO! 🌈";

    startConfetti();
  }, 6100);

  setTimeout(() => {
    secondRouletteArea.classList.add("hidden");
    secondPrizeResult.classList.remove("hidden");

    secondCaseIsOpening = false;

    secondCaseScreen?.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, 7000);
}

function openSecondGift() {
  showScreen(secondGiftScreen);
  startConfetti();
}

function openSecondGiftMessage() {
  if (!secondGiftMessageScreen) {
    console.error(
      'A tela "secondGiftMessageScreen" não foi encontrada no HTML.'
    );
    return;
  }

  showScreen(secondGiftMessageScreen);
}

function openFourthVideo() {
  if (!fourthVideoScreen) {
    console.error(
      'A tela "fourthVideoScreen" não foi encontrada no HTML.'
    );
    return;
  }

  showScreen(fourthVideoScreen);

  const fourthVideo = document.getElementById("fourthVideo");

  if (fourthVideo) {
    fourthVideo.pause();
    fourthVideo.currentTime = 0;
  } else {
    console.error(
      'O vídeo com id "fourthVideo" não foi encontrado no HTML.'
    );
  }
}

function openFinalGiftIntro() {
  const fourthVideo = document.getElementById("fourthVideo");

  if (fourthVideo) {
    fourthVideo.pause();
  }

  showScreen(finalGiftIntroScreen);
}

function openFinalCaseScreen() {
  resetFinalCase();
  showScreen(finalCaseScreen);
}

function resetFinalCase() {
  const finalCaseButton = document.getElementById("finalCaseButton");
  const finalRouletteArea = document.getElementById(
    "finalRouletteArea"
  );
  const finalRouletteTrack = document.getElementById(
    "finalRouletteTrack"
  );
  const finalRouletteStatus = document.getElementById(
    "finalRouletteStatus"
  );
  const finalPrizeResult = document.getElementById(
    "finalPrizeResult"
  );

  finalCaseIsOpening = false;

  if (finalCaseButton) {
    finalCaseButton.disabled = false;
    finalCaseButton.classList.remove("hidden");
  }

  if (finalRouletteArea) {
    finalRouletteArea.classList.add("hidden");
  }

  if (finalPrizeResult) {
    finalPrizeResult.classList.add("hidden");
  }

  if (finalRouletteTrack) {
    finalRouletteTrack.innerHTML = "";
    finalRouletteTrack.style.transition = "none";
    finalRouletteTrack.style.transform = "translateX(0px)";
  }

  if (finalRouletteStatus) {
    finalRouletteStatus.textContent =
      "Preparando roleta final...";
  }
}

function createFinalRouletteItems() {
  const finalRouletteTrack = document.getElementById(
    "finalRouletteTrack"
  );

  if (!finalRouletteTrack) {
    return;
  }

  finalRouletteTrack.innerHTML = "";

  const totalRounds = 10;
  const winnerRound = 8;

  for (let round = 0; round < totalRounds; round++) {
    finalRouletteItems.forEach((item) => {
      const itemElement = document.createElement("div");

      itemElement.className =
        `roulette-item ${item.rarity}`;

      if (round === winnerRound && item.winner) {
        itemElement.dataset.finalWinner = "true";
      }

      itemElement.innerHTML = `
        <div class="item-icon">${item.icon}</div>
        <span>${item.name}</span>
      `;

      finalRouletteTrack.appendChild(itemElement);
    });
  }
}

function openFinalCase() {
  if (finalCaseIsOpening) {
    return;
  }

  const finalCaseButton = document.getElementById("finalCaseButton");
  const finalRouletteArea = document.getElementById(
    "finalRouletteArea"
  );
  const finalRouletteTrack = document.getElementById(
    "finalRouletteTrack"
  );
  const finalRouletteStatus = document.getElementById(
    "finalRouletteStatus"
  );
  const finalPrizeResult = document.getElementById(
    "finalPrizeResult"
  );
  const rouletteWindow =
    finalRouletteArea?.querySelector(".roulette-window");

  if (
    !finalCaseButton ||
    !finalRouletteArea ||
    !finalRouletteTrack ||
    !finalRouletteStatus ||
    !finalPrizeResult ||
    !rouletteWindow
  ) {
    console.error(
      "Elementos da roleta final não foram encontrados."
    );
    return;
  }

  finalCaseIsOpening = true;

  finalCaseButton.disabled = true;
  finalCaseButton.classList.add("hidden");

  finalPrizeResult.classList.add("hidden");
  finalRouletteArea.classList.remove("hidden");

  createFinalRouletteItems();

  finalRouletteStatus.textContent =
    "ANALISANDO ARQUIVO LENDÁRIO...";

  finalRouletteTrack.style.transition = "none";
  finalRouletteTrack.style.transform = "translateX(0px)";

  requestAnimationFrame(() => {
    const winnerElement = finalRouletteTrack.querySelector(
      '[data-final-winner="true"]'
    );

    if (!winnerElement) {
      console.error(
        "O vencedor da roleta final não foi encontrado."
      );
      finalCaseIsOpening = false;
      return;
    }

    const rouletteWindowWidth = rouletteWindow.offsetWidth;
    const winnerCenter =
      winnerElement.offsetLeft +
      winnerElement.offsetWidth / 2;

    const finalPosition =
      winnerCenter - rouletteWindowWidth / 2;

    requestAnimationFrame(() => {
      finalRouletteTrack.style.transition =
        "transform 6s cubic-bezier(0.08, 0.72, 0.12, 1)";

      finalRouletteTrack.style.transform =
        `translateX(-${finalPosition}px)`;
    });
  });

  setTimeout(() => {
    finalRouletteStatus.textContent =
      "FINALIZANDO DESBLOQUEIO...";
  }, 3500);

  setTimeout(() => {
    finalRouletteStatus.textContent =
      "👑 PRESENTE LENDÁRIO ENCONTRADO! 👑";

    startConfetti();
  }, 6100);

  setTimeout(() => {
    finalRouletteArea.classList.add("hidden");
    finalPrizeResult.classList.remove("hidden");

    finalCaseIsOpening = false;

    finalCaseScreen?.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, 7000);
}

function openThirdGift() {
  showScreen(thirdGiftScreen);
  startConfetti();
}

function openFinalMessage() {
  showScreen(finalMessageScreen);
}

function openFinalVideo() {
  if (!finalVideoScreen) {
    console.error(
      'A tela "finalVideoScreen" não foi encontrada no HTML.'
    );
    return;
  }

  showScreen(finalVideoScreen);

  const finalVideo = document.getElementById("finalVideo");

  if (finalVideo) {
    finalVideo.pause();
    finalVideo.currentTime = 0;
  }
}

function openEndingScreen() {
  const finalVideo = document.getElementById("finalVideo");

  if (finalVideo) {
    finalVideo.pause();
  }

  showScreen(endingScreen);
  startConfetti();
}

function finishGifts() {
  openEndingScreen();
}

function restartSurprise() {
  window.location.reload();
}

startBootSequence();