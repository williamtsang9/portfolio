// ── FADE-IN ON SCROLL ──
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => {
        entry.target.classList.add('visible');
      }, i * 80);
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));

// ── TYPEWRITER ──
const titles = [
  'Senior Software Engineer',
  'Search Infrastructure Specialist',
  'Platform Engineer',
  'DevOps & AI Workflow Engineer',
];
let tIdx = 0, cIdx = 0, deleting = false;
const titleEl = document.querySelector('.hero-title');

function type() {
  const current = titles[tIdx];
  if (!deleting) {
    titleEl.childNodes[0].textContent = current.slice(0, cIdx + 1);
    cIdx++;
    if (cIdx === current.length) {
      deleting = true;
      setTimeout(type, 2200);
      return;
    }
  } else {
    titleEl.childNodes[0].textContent = current.slice(0, cIdx - 1);
    cIdx--;
    if (cIdx === 0) {
      deleting = false;
      tIdx = (tIdx + 1) % titles.length;
    }
  }
  setTimeout(type, deleting ? 45 : 75);
}

// Separate text node from cursor span
const cursorSpan = titleEl.querySelector('.cursor');
titleEl.innerHTML = '';
titleEl.appendChild(document.createTextNode(titles[0]));
titleEl.appendChild(cursorSpan);
setTimeout(type, 1800);

// ── ACTIVE NAV HIGHLIGHT ──
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(sec => {
    if (window.scrollY >= sec.offsetTop - 120) current = sec.id;
  });
  navLinks.forEach(a => {
    a.style.color = a.getAttribute('href') === '#' + current ? 'var(--accent)' : '';
  });
});
