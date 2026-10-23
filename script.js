
document.addEventListener("DOMContentLoaded", () => {
  const menuToggle = document.getElementById("menuToggle");
  const navigation = document.getElementById("navigation");
  const checklist = document.getElementById("checklist");
  const progressBar = document.getElementById("progressBar");
  const progressText = document.getElementById("progressText");
  const checklistMessage = document.getElementById("checklistMessage");
  const resetButton = document.getElementById("resetChecklist");
  const currentYear = document.getElementById("currentYear");
  const backToTop = document.getElementById("backToTop");

  // Текущий год в нижней части сайта.
  if (currentYear) {
    currentYear.textContent = new Date().getFullYear();
  }

  // Мобильное меню.
  function closeMenu() {
    if (!menuToggle || !navigation) return;

    navigation.classList.remove("active");
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Открыть меню");
  }

  if (menuToggle && navigation) {
    menuToggle.addEventListener("click", () => {
      const isOpen = navigation.classList.toggle("active");

      menuToggle.setAttribute("aria-expanded", String(isOpen));
      menuToggle.setAttribute(
        "aria-label",
        isOpen ? "Закрыть меню" : "Открыть меню"
      );
    });

    navigation.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", closeMenu);
    });

    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") {
        closeMenu();
      }
    });

    document.addEventListener("click", (event) => {
      const clickedInsideMenu = navigation.contains(event.target);
      const clickedToggle = menuToggle.contains(event.target);

      if (!clickedInsideMenu && !clickedToggle) {
        closeMenu();
      }
    });
  }

  // Экологический план.
  if (checklist && progressBar && progressText) {
    const checkboxes = Array.from(
      checklist.querySelectorAll('input[type="checkbox"]')
    );

    const storageKey = "kyrgyzstan2050-eco-checklist-v1";

    function updateChecklist() {
      const completed = checkboxes.filter((box) => box.checked).length;
      const total = checkboxes.length;
      const percentage = total > 0 ? (completed / total) * 100 : 0;

      progressBar.style.width = `${percentage}%`;
      progressText.textContent = `Выполнено: ${completed} из ${total}`;

      if (checklistMessage) {
        if (completed === total && total > 0) {
          checklistMessage.textContent =
            "Отлично! Теперь выбери следующий полезный шаг 🌿";
        } else if (completed >= 4) {
          checklistMessage.textContent =
            "Хороший прогресс! Продолжай действовать осознанно.";
        } else if (completed > 0) {
          checklistMessage.textContent =
            "Каждый продуманный шаг имеет значение.";
        } else {
          checklistMessage.textContent =
            "Выбери действие, с которого хочешь начать.";
        }
      }

      try {
        localStorage.setItem(
          storageKey,
          JSON.stringify(checkboxes.map((box) => box.checked))
        );
      } catch (error) {
        // Список всё равно работает, даже если браузер запрещает хранение.
      }
    }

    // Восстанавливаем предыдущий выбор, если браузер разрешает хранение.
    try {
      const saved = localStorage.getItem(storageKey);

      if (saved) {
        const states = JSON.parse(saved);

        if (Array.isArray(states)) {
          checkboxes.forEach((box, index) => {
            box.checked = states[index] === true;
          });
        }
      }
    } catch (error) {
      // При недоступности хранения список остаётся рабочим.
    }

    checkboxes.forEach((box) => {
      box.addEventListener("change", updateChecklist);
    });

    if (resetButton) {
      resetButton.addEventListener("click", () => {
        checkboxes.forEach((box) => {
          box.checked = false;
        });

        updateChecklist();
      });
    }

    updateChecklist();
  }

  // Плавная прокрутка к разделам.
  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener("click", (event) => {
      const targetId = link.getAttribute("href");

      if (!targetId || targetId === "#") return;

      const target = document.querySelector(targetId);

      if (target) {
        event.preventDefault();

        target.scrollIntoView({
          behavior: window.matchMedia(
            "(prefers-reduced-motion: reduce)"
          ).matches ? "auto" : "smooth",
          block: "start"
        });
      }
    });
  });

  // Появление карточек при прокрутке.
  const animatedCards = document.querySelectorAll(
    ".fact-card, .problem-card, .solution-card, .future-card, .youth-card"
  );

  const reduceMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  if ("IntersectionObserver" in window && !reduceMotion) {
    const observer = new IntersectionObserver(
      (entries, currentObserver) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            currentObserver.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.08,
        rootMargin: "0px 0px -20px 0px"
      }
    );

    animatedCards.forEach((card) => {
      card.classList.add("reveal-card");
      observer.observe(card);
    });
  }

  // Кнопка возврата наверх.
  if (backToTop) {
    const updateBackToTop = () => {
      backToTop.classList.toggle("visible", window.scrollY > 500);
    };

    window.addEventListener("scroll", updateBackToTop, {
      passive: true
    });

    backToTop.addEventListener("click", () => {
      window.scrollTo({
        top: 0,
        behavior: reduceMotion ? "auto" : "smooth"
      });
    });

    updateBackToTop();
  }
});

