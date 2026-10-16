const header = document.querySelector('.header');
window.addEventListener('scroll', () => {
  header.classList.toggle('scrolled', window.scrollY > 18);
}, { passive: true });

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.14 });

document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

const form = document.getElementById('leadForm');
const status = document.getElementById('formStatus');

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  const data = Object.fromEntries(new FormData(form));

  // Подключение реальной отправки:
  // замените URL ниже на webhook Telegram/CRM/Make/n8n/своего backend.
  const WEBHOOK_URL = '';

  if (!WEBHOOK_URL) {
    status.textContent = 'Макет формы работает. Подключите WEBHOOK_URL в script.js для реальной отправки заявок.';
    return;
  }

  try {
    status.textContent = 'Отправляем…';
    const res = await fetch(WEBHOOK_URL, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(data)
    });
    if (!res.ok) throw new Error('Request failed');
    form.reset();
    status.textContent = 'Спасибо! Заявка отправлена.';
  } catch {
    status.textContent = 'Не удалось отправить. Попробуйте ещё раз или свяжитесь с кофейней напрямую.';
  }
});
