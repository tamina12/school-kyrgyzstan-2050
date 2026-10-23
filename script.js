
"use strict";

// Мобильное меню
const menuToggle = document.getElementById("menuToggle");
const navigation = document.getElementById("navigation");

if (menuToggle && navigation) {
  menuToggle.addEventListener("click", () => {
    const isOpen = navigation.classList.toggle("open");
    menuToggle.setAttribute("aria-expanded", String(isOpen));
    menuToggle.setAttribute(
      "aria-label",
      isOpen ? "Закрыть меню" : "Открыть меню"
    );
    menuToggle.textContent = isOpen ? "✕" : "☰";
  });

  navigation.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      navigation.classList.remove("open");
      menuToggle.setAttribute("aria-expanded", "false");
      menuToggle.setAttribute("aria-label", "Открыть меню");
      menuToggle.textContent = "☰";
    });
  });
}

// Год внизу страницы
const currentYear = document.getElementById("currentYear");
if (currentYear) {
  currentYear.textContent = new Date().getFullYear();
}

// Кнопка возврата наверх
const backToTop = document.getElementById("backToTop");

if (backToTop) {
  window.addEventListener("scroll", () => {
    backToTop.classList.toggle("visible", window.scrollY > 500);
  });

  backToTop.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}

// Экологический чек-лист
const checklist = document.getElementById("checklist");
const progressBar = document.getElementById("progressBar");
const progressText = document.getElementById("progressText");
const resetChecklist = document.getElementById("resetChecklist");

const checklistStorageKey = "kyrgyzstan2050-eco-checklist";

function readChecklistState() {
  try {
    const saved = localStorage.getItem(checklistStorageKey);
    return saved ? JSON.parse(saved) : {};
  } catch {
    return {};
  }
}

function saveChecklistState(state) {
  try {
    localStorage.setItem(checklistStorageKey, JSON.stringify(state));
  } catch {
    // Сайт продолжит работать, если браузер запретил хранилище.
  }
}

if (checklist && progressBar && progressText) {
  const boxes = [...checklist.querySelectorAll('input[type="checkbox"]')];
  const savedState = readChecklistState();

  boxes.forEach((box) => {
    box.checked = savedState[box.value] === true;
  });

  function updateChecklist() {
    const checkedCount = boxes.filter((box) => box.checked).length;
    const total = boxes.length;
    const percentage = total ? (checkedCount / total) * 100 : 0;

    progressBar.style.width = `${percentage}%`;
    progressText.textContent = `Выполнено: ${checkedCount} из ${total}`;

    const state = {};
    boxes.forEach((box) => {
      state[box.value] = box.checked;
    });
    saveChecklistState(state);
  }

  boxes.forEach((box) => box.addEventListener("change", updateChecklist));

  if (resetChecklist) {
    resetChecklist.addEventListener("click", () => {
      boxes.forEach((box) => {
        box.checked = false;
      });
      updateChecklist();
    });
  }

  updateChecklist();
}

// EcoAI — демонстрационный чат
const chatForm = document.getElementById("chatForm");
const chatInput = document.getElementById("chatInput");
const chatMessages = document.getElementById("chatMessages");
const clearChat = document.getElementById("clearChat");

const ecoAnswers = {
  waste: `♻️ Как начать сортировать отходы?

1. Сначала узнай, какие материалы принимают в твоём городе.
2. Если есть подходящие пункты сбора, разделяй сухую бумагу, стекло, металл и принимаемый пластик.
3. Не клади загрязнённые остатками еды материалы в контейнер для переработки, если правила этого не разрешают.
4. Батарейки и электронные устройства сдавай в специальные пункты, если они доступны.

Важно: не всё, что выглядит перерабатываемым, принимают повсюду. Проверяй местные правила.`,

  water: `💧 Почему важно беречь воду?

Вода нужна людям, сельскому хозяйству и природным экосистемам. На водные ресурсы влияют загрязнение, потери в системах и изменение климата.

Что можно сделать: закрывать кран, когда вода не нужна, сообщать о протечках взрослым, не бросать отходы в водоёмы и узнавать о состоянии местных источников воды.`,

  glaciers: `🏔️ Почему важны ледники Кыргызстана?

Ледники входят в горные экосистемы и связаны с формированием речного стока. Изменение климата влияет на многие ледники, но темпы и последствия отличаются по местам.

Для школьного исследования используй научные наблюдения и отчёты. Не делай вывод о состоянии всех ледников по одной фотографии.`,

  air: `🌫️ Почему загрязняется воздух?

В зависимости от места и сезона на качество воздуха могут влиять отопление, транспорт, промышленные выбросы и пыль.

Возможные решения: более чистые системы отопления, удобный общественный транспорт, контроль выбросов, озеленение и регулярный мониторинг. Для выводов о конкретном городе нужны местные измерения.`,

  region: `📍 Давай изучим экологию твоего региона.

Напиши название города или села и проблему, которая тебя интересует: воздух, вода, отходы или состояние природы.

Я помогу сформулировать исследовательский вопрос и предложить план поиска информации. В этой версии я не получаю автоматически данные о местоположении и не проверяю свежие местные показатели.`,

  actions: `🌱 Что ты можешь сделать уже сегодня?

• Не оставляй мусор на улице и природе.
• Используй вещи повторно, когда это возможно.
• Экономь воду.
• Узнай, где принимают отходы для переработки.
• Проведи небольшое школьное наблюдение и запиши результаты.
• Делись проверенными фактами, а не непроверенными цифрами.

Выбери одно действие, которое реально выполнить на этой неделе.`,

  people: `Люди могут загрязнять природу по разным причинам: недостаток удобной инфраструктуры, привычки, нехватка информации, слабая система сбора отходов и другие факторы.

Лучше изучать причины конкретной ситуации, а не считать, что все люди поступают одинаково. Решения могут включать доступные контейнеры, образование, удобные правила и ответственность за загрязнение.`,

  climate: `Изменение климата связано с долгосрочными изменениями температуры и погодных закономерностей. На современное глобальное потепление главным образом влияют выбросы парниковых газов в результате деятельности человека.

Последствия для Кыргызстана нужно объяснять с опорой на научные данные по региону. Возможные меры включают сокращение выбросов, адаптацию инфраструктуры и бережное управление водными ресурсами.`,

  unknown: `🌿 Я пока не нашёл подходящую тему в своей демо-базе.

Попробуй выбрать одну из готовых кнопок или уточни вопрос. Например:
«Почему загрязняется воздух в Бишкеке?»
«Как правильно сортировать пластик?»
«Почему важно беречь воду?»

Сейчас я отвечаю по подготовленным материалам. Я не подключён к настоящей ИИ-модели и не могу надёжно анализировать любые сложные вопросы.`
};

function normalizeText(text) {
  return text
    .toLowerCase()
    .replace(/ё/g, "е")
    .replace(/[^\p{L}\p{N}\s]/gu, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function detectTopic(question) {
  const text = normalizeText(question);

  if (/ледник|ледники|тают лед|таяние лед|тянь шан/.test(text)) {
    return "glaciers";
  }

  if (/мусор|отход|сортир|переработ|пластик|стекло|батарей/.test(text)) {
    return "waste";
  }

  if (/вода|воды|водоем|водоём|река|озеро|кран|водных ресурс/.test(text)) {
    return "water";
  }

  if (/воздух|смог|дым|загрязнен.*воздух|загрязн.*бишкек/.test(text)) {
    return "air";
  }

  if (/климат|глобальн.*потеплен|парников.*газ/.test(text)) {
    return "climate";
  }

  if (/люди|человек|почему.*мусор|зачем.*мусор|загрязняют природу/.test(text)) {
    return "people";
  }

  if (/мой регион|моем регионе|город|село|район|бишкек|ош|кызыл кия/.test(text)) {
    return "region";
  }

  if (/что я могу|что делать|как помочь|помочь природе|мои действия/.test(text)) {
    return "actions";
  }

  return null;
}

function addChatMessage(text, type) {
  if (!chatMessages) return;

  const message = document.createElement("div");
  message.className = `message ${type}`;
  message.textContent = text;
  chatMessages.appendChild(message);
  chatMessages.scrollTop = chatMessages.scrollHeight;
}

function answerQuestion(question) {
  const cleaned = question.trim();
  if (!cleaned || !chatMessages) return;

  addChatMessage(cleaned, "user-message");

  const topic = detectTopic(cleaned);
  const answer = topic ? ecoAnswers[topic] : ecoAnswers.unknown;

  addChatMessage(answer, "bot-message");
}

if (chatForm && chatInput && chatMessages) {
  chatForm.addEventListener("submit", (event) => {
    event.preventDefault();
    answerQuestion(chatInput.value);
    chatInput.value = "";
    chatInput.focus();
  });

  document.querySelectorAll("[data-topic]").forEach((button) => {
    button.addEventListener("click", () => {
      const topic = button.dataset.topic;
      const answer = ecoAnswers[topic];

      if (!answer) return;

      addChatMessage(button.textContent.trim(), "user-message");
      addChatMessage(answer, "bot-message");
    });
  });

  if (clearChat) {
    clearChat.addEventListener("click", () => {
      chatMessages.replaceChildren();

      const welcome = document.createElement("div");
      welcome.className = "message bot-message";
      welcome.textContent =
        "Салам! 🌱 О чём хочешь узнать? Выбери готовую тему или задай свой вопрос.";
      chatMessages.appendChild(welcome);
    });
  }
}

