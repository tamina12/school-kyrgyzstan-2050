
/* =========================================
   КЫРГЫЗСТАН — 2050
   Interactive Eco Project
   ========================================= */

document.addEventListener("DOMContentLoaded", () => {

    // 1. МОБИЛЬНОЕ МЕНЮ

    const menuToggle = document.getElementById("menuToggle");
    const navigation = document.getElementById("navigation");

    if (menuToggle && navigation) {

        function closeMenu() {
            navigation.classList.remove("active");
            menuToggle.setAttribute("aria-expanded", "false");
            menuToggle.setAttribute("aria-label", "Открыть меню");
            menuToggle.textContent = "☰";
        }

        menuToggle.addEventListener("click", () => {
            const isOpen = navigation.classList.toggle("active");

            menuToggle.setAttribute("aria-expanded", String(isOpen));
            menuToggle.setAttribute(
                "aria-label",
                isOpen ? "Закрыть меню" : "Открыть меню"
            );

            menuToggle.textContent = isOpen ? "✕" : "☰";
        });

        // Закрываем меню после выбора раздела
        navigation.querySelectorAll("a").forEach((link) => {
            link.addEventListener("click", closeMenu);
        });

        // Закрываем меню при нажатии Escape
        document.addEventListener("keydown", (event) => {
            if (event.key === "Escape") {
                closeMenu();
            }
        });

        // При переходе на большой экран закрываем мобильное меню
        window.addEventListener("resize", () => {
            if (window.innerWidth > 760) {
                closeMenu();
            }
        });
    }


    // 2. ЭКО-МИССИЯ И ПОДСЧЁТ ПРОГРЕССА

    const checklist = document.getElementById("checklist");
    const progressText = document.getElementById("progressText");
    const progressBar = document.getElementById("progressBar");
    const checklistMessage = document.getElementById("checklistMessage");
    const resetButton = document.getElementById("resetChecklist");

    if (
        checklist &&
        progressText &&
        progressBar &&
        checklistMessage &&
        resetButton
    ) {

        const checkboxes = Array.from(
            checklist.querySelectorAll('input[type="checkbox"]')
        );

        const totalTasks = checkboxes.length;

        function updateProgress() {
            const completedTasks = checkboxes.filter(
                (checkbox) => checkbox.checked
            ).length;

            const percentage = totalTasks === 0
                ? 0
                : (completedTasks / totalTasks) * 100;

            progressText.textContent =
                `${completedTasks} из ${totalTasks}`;

            progressBar.style.width = `${percentage}%`;

            // Доступное описание прогресса для вспомогательных технологий
            progressBar.setAttribute("role", "progressbar");
            progressBar.setAttribute("aria-valuemin", "0");
            progressBar.setAttribute("aria-valuemax", "100");
            progressBar.setAttribute(
                "aria-valuenow",
                String(Math.round(percentage))
            );

            if (completedTasks === 0) {
                checklistMessage.textContent =
                    "Начни с одного полезного действия!";
            } else if (completedTasks < 3) {
                checklistMessage.textContent =
                    "Отличное начало! Каждый шаг имеет значение 🌱";
            } else if (completedTasks < totalTasks) {
                checklistMessage.textContent =
                    "Здорово! Ты уже выполнил несколько эко-миссий 💚";
            } else {
                checklistMessage.textContent =
                    "Все миссии отмечены! Ты молодец — продолжай заботиться о природе! 🌍";
            }
        }

        checkboxes.forEach((checkbox) => {
            checkbox.addEventListener("change", updateProgress);
        });

        // Сбрасываем отметки
        resetButton.addEventListener("click", () => {
            checkboxes.forEach((checkbox) => {
                checkbox.checked = false;
            });

            updateProgress();
        });

        // Начальное состояние
        updateProgress();
    }


    // 3. ПЛАВНАЯ НАВИГАЦИЯ ПО СТРАНИЦЕ

    document.querySelectorAll('a[href^="#"]').forEach((link) => {
        link.addEventListener("click", (event) => {
            const targetId = link.getAttribute("href");

            if (!targetId || targetId === "#") {
                return;
            }

            const target = document.querySelector(targetId);

            if (target) {
                event.preventDefault();

                target.scrollIntoView({
                    behavior: window.matchMedia(
                        "(prefers-reduced-motion: reduce)"
                    ).matches ? "auto" : "smooth",
                    block: "start"
                });

                // Обновляем адрес страницы без перезагрузки
                if (window.location.hash !== targetId) {
                    history.replaceState(null, "", targetId);
                }
            }
        });
    });


    // 4. ЛЁГКОЕ ПОЯВЛЕНИЕ КАРТОЧЕК ПРИ ПРОКРУТКЕ

    const animatedCards = document.querySelectorAll(
        ".info-card, .mission-card, .volunteer-card"
    );

    const reducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
    ).matches;

    if ("IntersectionObserver" in window && !reducedMotion) {

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
                threshold: 0.12
            }
        );

        animatedCards.forEach((card) => {
            card.classList.add("reveal-card");
            observer.observe(card);
        });
    } else {
        animatedCards.forEach((card) => {
            card.classList.add("is-visible");
        });
    }


    // 5. ТЕКУЩИЙ ГОД В ПОДВАЛЕ

    const footerText = document.querySelector(".footer-bottom p");

    if (footerText) {
        const currentYear = new Date().getFullYear();

        footerText.textContent =
            `© ${currentYear} · Кыргызстан — 2050 · Школьная экологическая инициатива`;
    }


    // 6. СООБЩЕНИЕ В КОНСОЛИ

    console.log(
        "🌱 Кыргызстан — 2050: сайт загружен. Начинаем создавать будущее!"
    );

});

