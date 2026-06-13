/* ==================== NAVIGATION ==================== */
const navMenu = document.getElementById('nav-menu');
const navToggle = document.getElementById('nav-toggle');
const navClose = document.getElementById('nav-close');
const navLinks = document.querySelectorAll('.nav-link');
const header = document.getElementById('header');
const scrollTopBtn = document.getElementById('scroll-top');

if (navToggle) {
  navToggle.addEventListener('click', () => {
    navMenu.classList.add('show');
    document.body.style.overflow = 'hidden';
  });
}

if (navClose) {
  navClose.addEventListener('click', () => {
    navMenu.classList.remove('show');
    document.body.style.overflow = '';
  });
}

navLinks.forEach((link) => {
  link.addEventListener('click', () => {
    navMenu.classList.remove('show');
    document.body.style.overflow = '';
  });
});

/* Active nav link on scroll */
const sections = document.querySelectorAll('section[id]');

function updateActiveNav() {
  const scrollY = window.scrollY;

  sections.forEach((section) => {
    const sectionHeight = section.offsetHeight;
    const sectionTop = section.offsetTop - 100;
    const sectionId = section.getAttribute('id');
    const navLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);

    if (navLink && scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
      navLinks.forEach((l) => l.classList.remove('active'));
      navLink.classList.add('active');
    }
  });
}

/* Header scroll effect & scroll to top */
function handleScroll() {
  if (window.scrollY >= 50) {
    header.classList.add('scroll-header');
    scrollTopBtn.classList.add('show');
  } else {
    header.classList.remove('scroll-header');
    scrollTopBtn.classList.remove('show');
  }
  updateActiveNav();
}

window.addEventListener('scroll', handleScroll);

/* ==================== THEME TOGGLE ==================== */
const themeToggle = document.getElementById('theme-toggle');
const html = document.documentElement;

function getPreferredTheme() {
  const saved = localStorage.getItem('portfolio-theme');
  if (saved) return saved;
  return window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
}

function setTheme(theme) {
  html.setAttribute('data-theme', theme);
  localStorage.setItem('portfolio-theme', theme);
  initParticles(theme);
}

setTheme(getPreferredTheme());

if (themeToggle) {
  themeToggle.addEventListener('click', () => {
    const current = html.getAttribute('data-theme');
    const next = current === 'dark' ? 'light' : 'dark';
    setTheme(next);
  });
}

window.matchMedia('(prefers-color-scheme: light)').addEventListener('change', (e) => {
  if (!localStorage.getItem('portfolio-theme')) {
    setTheme(e.matches ? 'light' : 'dark');
  }
});

/* ==================== PARTICLES.JS ==================== */
let particlesInitialized = false;

function getParticlesConfig(theme) {
  const isDark = theme === 'dark';

  return {
    particles: {
      number: {
        value: isDark ? 90 : 65,
        density: { enable: true, value_area: 900 }
      },
      color: { value: ['#e63946', '#ff4757', '#ff6b6b'] },
      shape: { type: 'circle' },
      opacity: {
        value: isDark ? 0.55 : 0.35,
        random: true,
        anim: { enable: true, speed: 1, opacity_min: 0.1, sync: false }
      },
      size: {
        value: 3,
        random: true,
        anim: { enable: true, speed: 2, size_min: 0.5, sync: false }
      },
      line_linked: {
        enable: true,
        distance: 150,
        color: '#e63946',
        opacity: isDark ? 0.22 : 0.12,
        width: 1
      },
      move: {
        enable: true,
        speed: isDark ? 1.8 : 1.2,
        direction: 'none',
        random: true,
        straight: false,
        out_mode: 'out',
        bounce: false,
        attract: { enable: false }
      }
    },
    interactivity: {
      detect_on: 'canvas',
      events: {
        onhover: { enable: true, mode: 'grab' },
        onclick: { enable: true, mode: 'push' },
        resize: true
      },
      modes: {
        grab: {
          distance: 160,
          line_linked: { opacity: 0.6 }
        },
        push: { particles_nb: 5 },
        repulse: { distance: 120, duration: 0.4 }
      }
    },
    retina_detect: true
  };
}

function initParticles(theme) {
  if (typeof particlesJS === 'undefined') return;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  const container = document.getElementById('particles-js');
  if (!container) return;

  if (particlesInitialized && window.pJSDom && window.pJSDom.length) {
    window.pJSDom.forEach((instance) => {
      if (instance.pJS && instance.pJS.fn && instance.pJS.fn.vendors) {
        instance.pJS.fn.vendors.destroypJS();
      }
    });
    window.pJSDom = [];
    container.innerHTML = '';
  }

  particlesJS('particles-js', getParticlesConfig(theme || html.getAttribute('data-theme')));
  particlesInitialized = true;
}

/* ==================== TYPED.JS ==================== */
if (typeof Typed !== 'undefined') {
  new Typed('.typing-text', {
    strings: [
      'Frontend Developer',
      'WordPress Developer',      
      'Web Developer',
    ],
    typeSpeed: 60,
    backSpeed: 40,
    backDelay: 2000,
    loop: true,
    showCursor: true,
    cursorChar: '|'
  });
}

/* ==================== SCROLL REVEAL (lightweight fallback) ==================== */
if (typeof ScrollReveal !== 'undefined') {
  ScrollReveal().reveal('.section-title', { distance: '20px', duration: 500, delay: 50 });
}

/* ==================== SCROLL MOTION & ENTER ANIMATIONS ==================== */
const motionElements = document.querySelectorAll('[data-scroll]');
let motionTicking = false;

const ANIM_TYPES = ['anim-fade-up', 'anim-fade-in', 'anim-zoom-in', 'anim-zoom-out'];
const CARD_SELECTORS = [
  '.skill-card',
  '.service-card',
  '.about-stat-card',
  '.about-image',
  '.timeline-item',
  '.portfolio-item',
  '.contact-card',
  '.contact-form-wrapper'
].join(',');

const ABOUT_INNER_SELECTORS = '.about-tag, .about-subtitle, .about-description, .about-info-item';

function initScrollAnimations() {
  document.querySelectorAll(CARD_SELECTORS).forEach((el, index) => {
    el.classList.remove('scroll-fade');
    el.removeAttribute('data-scroll');
    el.removeAttribute('data-scroll-speed');
    el.removeAttribute('data-scroll-direction');
    el.removeAttribute('data-scroll-rotate');

    el.classList.add('scroll-animate', ANIM_TYPES[index % ANIM_TYPES.length]);
    if (!el.classList.contains('portfolio-item')) {
      el.classList.add('card-hover');
    }
    el.style.setProperty('--animate-delay', `${(index % 6) * 90}ms`);
  });

  document.querySelectorAll(ABOUT_INNER_SELECTORS).forEach((el, index) => {
    el.classList.remove('scroll-fade');
    el.classList.add('scroll-animate', ANIM_TYPES[index % ANIM_TYPES.length]);
    el.style.setProperty('--animate-delay', `${120 + index * 75}ms`);
  });

  document.querySelectorAll('.about-content').forEach((el) => {
    el.classList.remove('scroll-fade', 'scroll-animate', 'card-hover');
    el.removeAttribute('data-scroll');
  });

  document.querySelectorAll('.portfolio-intro').forEach((el) => {
    el.classList.remove('scroll-fade');
    el.removeAttribute('data-scroll');
    el.classList.add('scroll-animate', 'anim-fade-in');
    el.style.setProperty('--animate-delay', '80ms');
  });

  document.querySelectorAll('.portfolio-item').forEach((el, index) => {
    el.style.setProperty('--animate-delay', `${index * 100}ms`);
  });

  document.querySelectorAll('.section-title').forEach((el) => {
    el.classList.remove('scroll-fade');
    el.removeAttribute('data-scroll');
    el.classList.add('scroll-animate', 'anim-fade-up');
    el.style.setProperty('--animate-delay', '0ms');
  });
}

function updateScrollMotion() {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    motionTicking = false;
    return;
  }

  const viewH = window.innerHeight;

  motionElements.forEach((el) => {
    const rect = el.getBoundingClientRect();
    const speed = parseFloat(el.dataset.scrollSpeed) || 0.08;
    const direction = el.dataset.scrollDirection || 'up';
    const rotateAmt = parseFloat(el.dataset.scrollRotate) || 0;

    const centerOffset = (rect.top + rect.height / 2 - viewH / 2) / viewH;
    const move = centerOffset * 80 * speed;

    let x = 0;
    let y = 0;

    switch (direction) {
      case 'up': y = move; break;
      case 'down': y = -move; break;
      case 'left': x = move; break;
      case 'right': x = -move; break;
      default: y = move;
    }

    const rotate = centerOffset * rotateAmt;

    el.style.setProperty('--scroll-x', `${x}px`);
    el.style.setProperty('--scroll-y', `${y}px`);
    el.style.setProperty('--scroll-rotate', `${rotate}deg`);
    el.style.setProperty('--scroll-scale', '1');
  });

  motionTicking = false;
}

function requestScrollMotion() {
  if (!motionTicking) {
    requestAnimationFrame(updateScrollMotion);
    motionTicking = true;
  }
}

window.addEventListener('scroll', requestScrollMotion, { passive: true });
window.addEventListener('resize', requestScrollMotion, { passive: true });

const animateObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        if (entry.target.classList.contains('section-title')) {
          entry.target.classList.add('title-visible');
        }
      }
    });
  },
  { threshold: 0.12, rootMargin: '0px 0px -25px 0px' }
);

function observeAnimatedElements() {
  document.querySelectorAll('.scroll-animate, .scroll-fade').forEach((el) => {
    animateObserver.observe(el);
  });
}

initScrollAnimations();
observeAnimatedElements();
requestScrollMotion();

function revealInViewOnLoad() {
  document.querySelectorAll('.scroll-animate, .scroll-fade').forEach((el) => {
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight * 0.92) {
      el.classList.add('is-visible');
      if (el.classList.contains('section-title')) {
        el.classList.add('title-visible');
      }
    }
  });

  document.querySelectorAll('.section:not(.home)').forEach((section) => {
    const rect = section.getBoundingClientRect();
    if (rect.top < window.innerHeight * 0.85) {
      section.classList.add('section-visible');
    }
  });
}

/* ==================== SECTION SCROLL REVEAL ==================== */
const sectionRevealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('section-visible');
      }
    });
  },
  { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
);

document.querySelectorAll('.section:not(.home)').forEach((section) => {
  sectionRevealObserver.observe(section);
});

/* ==================== COUNTER ANIMATION ==================== */


// function animateCounters() {


// const statNumbers = document.querySelectorAll(".stat-number");
// let countersStarted = false;

// function animateCounters() {
//   if (countersStarted) return;

//   const statsSection = document.querySelector(".stats-section");
//   const rect = statsSection.getBoundingClientRect();

//   if (rect.top < window.innerHeight && rect.bottom > 0) {
//     countersStarted = true;

//     statNumbers.forEach((stat) => {
//       const target = parseInt(stat.dataset.target);
//       let current = 0;

//       const timer = setInterval(() => {
//         current++;

//         if (current >= target) {
//           clearInterval(timer);

//           if (target === 100) {
//             stat.textContent = target + "%";
//           } else {
//             stat.textContent = target + "+";
//           }
//         } else {
//           if (target === 100) {
//             stat.textContent = current + "%";
//           } else {
//             stat.textContent = current;
//           }
//         }
//       }, 30);
//     });
//   }
// }

const statNumbers = document.querySelectorAll(".about-stat-number");
let countersStarted = false;

function animateCounters() {
  if (countersStarted) return;

  const statsSection = document.querySelector(".about-stats");
  const rect = statsSection.getBoundingClientRect();

  if (rect.top < window.innerHeight && rect.bottom > 0) {
    countersStarted = true;

    statNumbers.forEach((stat) => {
      const target = parseInt(stat.dataset.target);
      let current = 0;

      const timer = setInterval(() => {
        current++;

        if (current >= target) {
          clearInterval(timer);

          if (target === 100) {
            stat.textContent = target + "%";
          } else {
            stat.textContent = target + "+";
          }
        } else {
          if (target === 100) {
            stat.textContent = current + "%";
          } else {
            stat.textContent = current;
          }
        }
      }, 30);
    });
  }
}

window.addEventListener("scroll", animateCounters);
window.addEventListener("load", animateCounters);

window.addEventListener("scroll", animateCounters);
window.addEventListener("load", animateCounters);

window.addEventListener('scroll', animateCounters);
animateCounters();

/* ==================== SMOOTH SCROLL FOR ANCHOR LINKS ==================== */
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener('click', function (e) {
    const href = this.getAttribute('href');
    if (href === '#') return;

    const target = document.querySelector(href);
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth' });
    }
  });
});

/* ==================== MAGNETIC BUTTONS ==================== */
const magneticBtns = document.querySelectorAll('.magnetic-btn');

magneticBtns.forEach((btn) => {
  btn.addEventListener('mousemove', (e) => {
    const rect = btn.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    btn.style.transform = `translate(${x * 0.2}px, ${y * 0.2}px)`;
  });

  btn.addEventListener('mouseleave', () => {
    btn.style.transform = '';
  });
});

/* ==================== SKILL CARDS STAGGER HOVER ==================== */
const skillCards = document.querySelectorAll('.skill-card');

skillCards.forEach((card, index) => {
  card.style.animationDelay = `${index * 0.05}s`;
});

/* ==================== SERVICE CARD 3D TILT ==================== */
const serviceCards = document.querySelectorAll('.service-card');

serviceCards.forEach((card) => {
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;

    card.style.setProperty('--tilt-x', `${-y * 8}deg`);
    card.style.setProperty('--tilt-y', `${x * 8}deg`);
  });

  card.addEventListener('mouseleave', () => {
    card.style.setProperty('--tilt-x', '0deg');
    card.style.setProperty('--tilt-y', '0deg');
  });
});

/* ==================== NAV LOGO GLITCH HOVER ==================== */
const navLogo = document.querySelector('.nav-logo');

if (navLogo) {
  navLogo.addEventListener('mouseenter', () => {
    navLogo.style.textShadow = '2px 0 var(--accent), -2px 0 #ff6b6b';
  });

  navLogo.addEventListener('mouseleave', () => {
    navLogo.style.textShadow = '';
  });
}

/* ==================== CURSOR GLOW (DESKTOP) ==================== */
if (window.matchMedia('(pointer: fine)').matches) {
  const cursorGlow = document.createElement('div');
  cursorGlow.className = 'cursor-glow';
  document.body.appendChild(cursorGlow);

  let glowX = 0;
  let glowY = 0;
  let currentX = 0;
  let currentY = 0;

  document.addEventListener('mousemove', (e) => {
    glowX = e.clientX;
    glowY = e.clientY;
  });

  function animateGlow() {
    currentX += (glowX - currentX) * 0.08;
    currentY += (glowY - currentY) * 0.08;
    cursorGlow.style.transform = `translate(${currentX}px, ${currentY}px)`;
    requestAnimationFrame(animateGlow);
  }

  animateGlow();
}

/* ==================== CONTACT FORM ==================== */
const contactForm = document.getElementById('contact-form');
const formStatus = document.getElementById('form-status');

if (contactForm && formStatus) {
  contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const submitBtn = contactForm.querySelector('.btn-submit');
    formStatus.textContent = '';
    formStatus.className = 'form-status';
    submitBtn.classList.add('is-loading');

    try {
      const response = await fetch(contactForm.action, {
        method: 'POST',
        body: new FormData(contactForm),
        headers: { Accept: 'application/json' }
      });

      const data = await response.json();

      if (response.ok && data.success) {
        formStatus.textContent = 'Message sent successfully!';
        formStatus.classList.add('is-success');
        contactForm.reset();
      } else {
        throw new Error(data.message || 'Something went wrong. Please try again.');
      }
    } catch (error) {
      formStatus.textContent = error.message || 'Unable to send message. Please try again.';
      formStatus.classList.add('is-error');
    } finally {
      submitBtn.classList.remove('is-loading');
    }
  });
}

/* ==================== PAGE LOAD ==================== */
window.addEventListener('load', () => {
  document.body.classList.add('loaded');
  handleScroll();
  requestScrollMotion();
  revealInViewOnLoad();
});

// Contact Form

const form = document.getElementById('form');
const submitBtn = form.querySelector('button[type="submit"]');

form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const formData = new FormData(form);
    formData.append("access_key", "1133c26e-5a15-4ed3-a715-1807c2cdaa38");

    const originalText = submitBtn.textContent;

    submitBtn.textContent = "Sending...";
    submitBtn.disabled = true;

    try {
        const response = await fetch("https://api.web3forms.com/submit", {
            method: "POST",
            body: formData
        });

        const data = await response.json();

        if (response.ok) {
            alert("Success! Your message has been sent.");
            form.reset();
        } else {
            alert("Error: " + data.message);
        }

    } catch (error) {
        alert("Something went wrong. Please try again.");
    } finally {
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
    }
});
