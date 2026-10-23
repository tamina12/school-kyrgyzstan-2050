
const menuToggle = document.getElementById('menuToggle');
const navLinks = document.getElementById('navLinks');

// Мобильное меню
if (menuToggle && navLinks) {
  menuToggle.addEventListener('click', () => {
    const isOpen = navLinks.classList.toggle('active');

    menuToggle.setAttribute('aria-expanded', String(isOpen));
    menuToggle.setAttribute(
      'aria-label',
      isOpen ? 'Закрыть меню' : 'Открыть меню'
    );
    menuToggle.textContent = isOpen ? '✕' : '☰';
  });

  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('active');
      menuToggle.setAttribute('aria-expanded', 'false');
      menuToggle.setAttribute('aria-label', 'Открыть меню');
      menuToggle.textContent = '☰';
    });
  });
}

// Раскрытие карточек
document.querySelectorAll('.resource-card').forEach(card => {
  const button = card.querySelector('.learn-more');

  if (!button) return;

  button.addEventListener('click', () => {
    const isOpen = card.classList.toggle('open');

    button.setAttribute('aria-expanded', String(isOpen));
    button.textContent = isOpen ? 'Скрыть −' : 'Узнать больше +';
  });
});

// Интерактивный экологический план
const checkboxes = document.querySelectorAll('.eco-check');
const progressText = document.getElementById('progressText');
const progressBar = document.getElementById('progressBar');
const progressTrack = document.getElementById('progressTrack');
const resetButton = document.getElementById('resetChecks');

function updateProgress() {
  const total = checkboxes.length;
  const completed = document.querySelectorAll('.eco-check:checked').length;
  const percentage = total ? (completed / total) * 100 : 0;

  if (progressText) {
    progressText.textContent =
      `Выполнено: ${completed} из ${total} действий`;
  }

  if (progressBar) {
    progressBar.style.width = `${percentage}%`;
  }

  if (progressTrack) {
    progressTrack.setAttribute('aria-valuenow', String(completed));
  }
}

checkboxes.forEach(checkbox => {
  checkbox.addEventListener('change', updateProgress);
});

if (resetButton) {
  resetButton.addEventListener('click', () => {
    checkboxes.forEach(checkbox => {
      checkbox.checked = false;
    });

    updateProgress();
  });
}

updateProgress();
