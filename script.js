/* =========================================================
   Melistandard Bottom Pot — script.js
   Vanilla ES6 — no frameworks
   ========================================================= */

/* -------- Loader -------- */
window.addEventListener('load', () => {
  const loader = document.getElementById('loader');
  setTimeout(() => loader.classList.add('hide'), 600);
});

/* -------- Year -------- */
document.getElementById('year').textContent = new Date().getFullYear();

/* -------- Navbar scroll + progress + back-to-top -------- */
const navbar = document.getElementById('navbar');
const progress = document.getElementById('scroll-progress');
const toTop = document.getElementById('to-top');

window.addEventListener('scroll', () => {
  const y = window.scrollY;
  navbar.classList.toggle('scrolled', y > 50);
  const h = document.documentElement.scrollHeight - window.innerHeight;
  progress.style.width = (y / h) * 100 + '%';
  toTop.classList.toggle('show', y > 500);
});

toTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

/* -------- Hamburger -------- */
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('nav-menu');
hamburger.addEventListener('click', () => {
  const open = navMenu.classList.toggle('open');
  hamburger.classList.toggle('active', open);
  hamburger.setAttribute('aria-expanded', open);
});
document.querySelectorAll('.nav-link').forEach(l =>
  l.addEventListener('click', () => {
    navMenu.classList.remove('open');
    hamburger.classList.remove('active');
  })
);

/* -------- Mouse glow -------- */
const glow = document.getElementById('mouse-glow');
window.addEventListener('mousemove', e => {
  glow.style.left = e.clientX + 'px';
  glow.style.top = e.clientY + 'px';
});

/* -------- Parallax hero -------- */
const heroBg = document.querySelector('.hero-bg');
window.addEventListener('scroll', () => {
  const y = window.scrollY;
  if (y < window.innerHeight) heroBg.style.transform = `translateY(${y * 0.4}px)`;
});

/* -------- Reveal animations (Intersection Observer) -------- */
const io = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('visible');
      io.unobserve(e.target);
    }
  });
}, { threshold: 0.15 });

document.querySelectorAll('.fade-up,.reveal-up,.reveal-left,.reveal-right')
  .forEach(el => io.observe(el));

/* -------- Counter animation -------- */
const counterIO = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (!e.isIntersecting) return;
    const el = e.target;
    const target = +el.dataset.target;
    const suffix = el.dataset.suffix || (target >= 500 ? '+' : '');
    const duration = 1800;
    const start = performance.now();
    const step = (now) => {
      const p = Math.min((now - start) / duration, 1);
      const val = Math.floor(p * target);
      el.textContent = val.toLocaleString() + (p === 1 ? suffix : '');
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
    counterIO.unobserve(el);
  });
}, { threshold: 0.6 });
document.querySelectorAll('.counter').forEach(el => counterIO.observe(el));

/* -------- Typing effect on hero headline -------- */
const typer = document.getElementById('typing-headline');
if (typer) {
  const full = typer.textContent;
  typer.textContent = '';
  let i = 0;
  const speed = 45;
  const type = () => {
    if (i <= full.length) {
      typer.textContent = full.slice(0, i++);
      setTimeout(type, speed);
    }
  };
  setTimeout(type, 600);
}

/* -------- Lightbox -------- */
const lightbox = document.getElementById('lightbox');
const lbImg = document.getElementById('lightbox-img');
document.querySelectorAll('.masonry img').forEach(img => {
  img.addEventListener('click', () => {
    lbImg.src = img.src;
    lightbox.classList.add('open');
  });
});
lightbox.addEventListener('click', e => {
  if (e.target === lightbox || e.target.classList.contains('lightbox-close')) {
    lightbox.classList.remove('open');
  }
});

/* -------- Testimonials carousel -------- */
const track = document.getElementById('testimonial-track');
const dotsWrap = document.getElementById('t-dots');
const cards = track.children.length;
let current = 0;
for (let i = 0; i < cards; i++) {
  const b = document.createElement('button');
  if (i === 0) b.classList.add('active');
  b.addEventListener('click', () => goTo(i));
  dotsWrap.appendChild(b);
}
function goTo(i) {
  current = i;
  track.style.transform = `translateX(-${i * 100}%)`;
  [...dotsWrap.children].forEach((d, idx) => d.classList.toggle('active', idx === i));
}
setInterval(() => goTo((current + 1) % cards), 5000);

/* -------- Booking form -------- */
const form = document.getElementById('booking-form');
const popup = document.getElementById('popup');
form.addEventListener('submit', (e) => {
  e.preventDefault();
  // basic validation
  const data = new FormData(form);
  const required = ['name', 'phone', 'email', 'eventType', 'guests', 'date', 'location'];
  for (const k of required) {
    if (!String(data.get(k) || '').trim()) {
      alert('Please complete all required fields.');
      return;
    }
  }
  popup.classList.add('open');
  form.reset();
});
document.getElementById('popup-close').addEventListener('click', () => popup.classList.remove('open'));
popup.addEventListener('click', e => { if (e.target === popup) popup.classList.remove('open'); });

/* -------- Order buttons -------- */
document.querySelectorAll('.btn-mini').forEach(b => {
  b.addEventListener('click', () => {
    document.getElementById('booking').scrollIntoView({ behavior: 'smooth' });
  });
});
