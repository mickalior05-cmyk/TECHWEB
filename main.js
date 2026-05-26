/* ═══════════════════════════════════════════
   AutoShowcase — main.js
═══════════════════════════════════════════ */

/* ── Hamburger Menu ─────────────────────── */
const hamburger = document.querySelector('.hamburger');
const navMobile = document.querySelector('.nav-mobile');
if (hamburger && navMobile) {
  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('open');
    navMobile.classList.toggle('open');
  });
  navMobile.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      hamburger.classList.remove('open');
      navMobile.classList.remove('open');
    });
  });
}

/* ── Lien actif selon la page ───────────── */
const page = window.location.pathname.split('/').pop() || 'index.html';
document.querySelectorAll('.nav-links a, .nav-mobile a').forEach(a => {
  if (a.getAttribute('href') === page) a.classList.add('active');
});

/* ── Scroll reveal ──────────────────────── */
const reveals = document.querySelectorAll('.reveal');
const observer = new IntersectionObserver((entries) => {
  entries.forEach((e, i) => {
    if (e.isIntersecting) {
      setTimeout(() => e.target.classList.add('visible'), i * 80);
      observer.unobserve(e.target);
    }
  });
}, { threshold: 0.1 });
reveals.forEach(el => observer.observe(el));

/* ── Filtre Catalogue ───────────────────── */
const filtresBtns = document.querySelectorAll('.filtre-btn');
const carCards    = document.querySelectorAll('.car-card[data-type]');
if (filtresBtns.length) {
  filtresBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filtresBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const type = btn.dataset.filter;
      carCards.forEach(card => {
        card.classList.toggle('hidden', type !== 'tous' && card.dataset.type !== type);
      });
    });
  });
}

/* ── Galerie Détail ─────────────────────── */
const thumbs   = document.querySelectorAll('.gallery-thumb');
const mainImg  = document.querySelector('.gallery-main img');
if (thumbs.length && mainImg) {
  thumbs.forEach(thumb => {
    thumb.addEventListener('click', () => {
      thumbs.forEach(t => t.classList.remove('active'));
      thumb.classList.add('active');
      mainImg.src = thumb.querySelector('img').src;
    });
  });
  thumbs[0]?.classList.add('active');
}

/* ── Compteur stats animé ───────────────── */
function animateCount(el, target, suffix = '') {
  let current = 0;
  const step = Math.ceil(target / 60);
  const timer = setInterval(() => {
    current = Math.min(current + step, target);
    el.textContent = current + suffix;
    if (current >= target) clearInterval(timer);
  }, 25);
}
const statNums = document.querySelectorAll('.stat-num[data-count]');
const statsObs = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      const el = e.target;
      animateCount(el, parseInt(el.dataset.count), el.dataset.suffix || '');
      statsObs.unobserve(el);
    }
  });
}, { threshold: 0.5 });
statNums.forEach(el => statsObs.observe(el));

/* ── Formulaire contact ─────────────────── */
const form = document.querySelector('.contact-form');
if (form) {
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const btn = form.querySelector('button[type="submit"]');
    btn.textContent = 'Message envoyé ✓';
    btn.style.background = '#22c55e';
    btn.style.borderColor = '#22c55e';
    btn.style.color = '#fff';
    setTimeout(() => {
      btn.textContent = 'Envoyer le message';
      btn.style.background = '';
      btn.style.borderColor = '';
      btn.style.color = '';
      form.reset();
    }, 3000);
  });
}
