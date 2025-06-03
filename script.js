// Carousel functionality
let currentSlide = 0;
const slides = document.querySelectorAll('.carousel-item');
const indicators = document.getElementById('carousel-indicators');

function showSlide(n) {
  slides.forEach((slide, idx) => {
    slide.classList.toggle('active', idx === n);
  });
  if (indicators) {
    indicators.innerHTML = '';
    slides.forEach((_, idx) => {
      const btn = document.createElement('button');
      btn.className = idx === n ? 'active' : '';
      btn.setAttribute('aria-label', 'Go to slide ' + (idx + 1));
      btn.onclick = () => moveToSlide(idx);
      indicators.appendChild(btn);
    });
  }
  currentSlide = n;
}

function moveSlide(dir) {
  let next = currentSlide + dir;
  if (next < 0) next = slides.length - 1;
  if (next >= slides.length) next = 0;
  showSlide(next);
}
function moveToSlide(n) {
  showSlide(n);
}

// Add swipe support for mobile
let touchStartX = null;
const carousel = document.getElementById('carousel');
if (carousel) {
  carousel.addEventListener('touchstart', (e) => {
    if (e.touches.length === 1) {
      touchStartX = e.touches[0].clientX;
    }
  });
  carousel.addEventListener('touchend', (e) => {
    if (touchStartX !== null && e.changedTouches.length === 1) {
      const dx = e.changedTouches[0].clientX - touchStartX;
      if (Math.abs(dx) > 40) {
        moveSlide(dx > 0 ? -1 : 1);
      }
    }
    touchStartX = null;
  });
}

showSlide(0);

// Mobile nav
const navToggle = document.getElementById('nav-toggle');
const navbarLinks = document.getElementById('navbar-links');
if (navToggle && navbarLinks) {
  navToggle.addEventListener('click', function () {
    navbarLinks.classList.toggle('open');
  });
  // Close nav menu when a link is clicked (on mobile)
  const navLinks = navbarLinks.querySelectorAll('a');
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      if (window.innerWidth < 700) {
        navbarLinks.classList.remove('open');
      }
    });
  });
}

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const targetId = this.getAttribute('href').slice(1);
    const target = document.getElementById(targetId);
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

// Confetti animation for booking button
function celebrateConfetti() {
  const confetti = document.getElementById('confetti');
  if (!confetti) return;
  confetti.innerHTML = '';
  for (let i = 0; i < 24; i++) {
    const dot = document.createElement('div');
    dot.style.position = 'absolute';
    dot.style.left = Math.random() * 100 + '%';
    dot.style.top = Math.random() * 30 + 10 + '%';
    dot.style.width = dot.style.height = Math.random() * 6 + 4 + 'px';
    dot.style.background = `hsl(${Math.random() * 40 + 30}, 60%, 75%)`;
    dot.style.borderRadius = '50%';
    dot.style.opacity = 0.85;
    dot.style.pointerEvents = 'none';
    dot.style.zIndex = 99;
    dot.animate([
      { transform: 'translateY(0px) scale(1)' },
      { transform: `translateY(${Math.random() * 50 + 30}px) scale(${Math.random() * 0.7 + 0.7})` }
    ], {
      duration: 900 + Math.random() * 400,
      easing: 'ease-out',
      fill: 'forwards'
    });
    confetti.appendChild(dot);
  }
  setTimeout(() => { confetti.innerHTML = ''; }, 1200);
}

// Set year in footer
document.getElementById('year').textContent = new Date().getFullYear();

// Back to top
const backToTop = document.getElementById('backToTop');
if (backToTop) {
  backToTop.addEventListener('click', function (e) {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}