
const menuToggle = document.getElementById("menuToggle");
const nav = document.getElementById("nav");

menuToggle.addEventListener("click", () => {
  nav.classList.toggle("open");
});

nav.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => nav.classList.remove("open"));
});

// Эко-чеклист
const checks = document.querySelectorAll(
  '.checklist-panel input[type="checkbox"]'
);
const progressBar = document.getElementById("progressBar");
const progressText = document.getElementById("progressText");

function updateProgress() {
  const done = [...checks].filter((item) => item.checked).length;
  progressBar.style.width = `${(done / checks.length) * 100}%`;
  progressText.textContent = `Выполнено: ${done} из ${checks.length}`;
}

checks.forEach((item) => item.addEventListener("change", updateProgress));

// Демонстрационный эко-помощник
const ecoForm = document.getElementById("ecoForm");
const ecoQuestion = document.getElementById("ecoQuestion");
const ecoAnswer = document.getElementById("ecoAnswer");

function getEcoAnswer(value) {
  const question = value.toLowerCase();

  if (question.includes("вод") || question.includes("кран")) {
    return "Закрывай кран, пока чистишь зубы, и сообщай взрослым о протечках.";
  }

  if (
    question.includes("отход") ||
    question.includes("мусор") ||
    question.includes("сорт")
  ) {
    return "По возможности разделяй бумагу, пластик и стекло. Уточни, какие материалы принимают на переработку в твоём городе.";
  }

  if (
    question.includes("воздух") ||
    question.includes("дым") ||
    question.includes("загрязн")
  ) {
    return "На качество воздуха влияют транспорт, отопление и пыль. Следи за официальными данными о качестве воздуха.";
  }

  if (
    question.includes("ледник") ||
    question.includes("климат") ||
    question.includes("тая")
  ) {
    return "Ледники важны для водных ресурсов Кыргызстана. Изменение климата влияет на их состояние, поэтому важно изучать научные данные.";
  }

  if (question.includes("пластик") || question.includes("бутыл")) {
    return "Используй многоразовую бутылку, когда это удобно, и сдавай чистую упаковку туда, где её принимают.";
  }

  return "Начни с малого: береги воду, не оставляй мусор и используй вещи повторно. Экологические факты проверяй по надёжным источникам.";
}

ecoForm.addEventListener("submit", (event) => {
  event.preventDefault();
  ecoAnswer.textContent = getEcoAnswer(ecoQuestion.value.trim());
});

document.querySelectorAll("[data-question]").forEach((button) => {
  button.addEventListener("click", () => {
    const question = button.dataset.question;
    ecoQuestion.value = question;
    ecoAnswer.textContent = getEcoAnswer(question);
  });
});

