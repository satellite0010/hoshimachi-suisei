/* ===================== script.js ===================== */

// --- Nav scroll effect ---
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    nav.classList.add('scrolled');
  } else {
    nav.classList.remove('scrolled');
  }
});

// --- Intersection Observer: Skill bars animation ---
const skillFills = document.querySelectorAll('.skill-item__fill');
const skillObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('animated');
    }
  });
}, { threshold: 0.3 });

skillFills.forEach(fill => skillObserver.observe(fill));

// --- Intersection Observer: Fade-in sections ---
const fadeEls = document.querySelectorAll(
  '.about__card, .timeline__card, .oshi-card, .hobby-card, .music-card, .food__card'
);

const fadeObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => {
        entry.target.style.opacity = '1';
        entry.target.style.transform = entry.target.style.transform || 'none';
        entry.target.classList.add('visible');
      }, 80 * (entry.target.dataset.delay || 0));
      fadeObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

fadeEls.forEach((el, i) => {
  el.style.opacity = '0';
  el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
  el.style.transform = 'translateY(20px)';
  el.dataset.delay = i % 5;
  fadeObserver.observe(el);
});

// --- Smooth scroll for nav links ---
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

// --- Now Playing: rotate through songs ---
const songs = [
  { title: 'Stellar Stellar',    artist: '星街すいせい' },
  { title: 'GHOST',              artist: '星街すいせい' },
  { title: 'elma',               artist: 'Yorushika' },
  { title: 'だから僕は音楽を辞めた', artist: 'Yorushika' },
  { title: 'ユウレイ',            artist: 'なとり' },
  { title: '水平線',              artist: 'back number' },
  { title: 'カーテン',            artist: 'tuki.' },
  { title: 'Mela!',              artist: '緑黄色社会' },
  { title: 'お気に召すまま',       artist: 'Eve' },
];

let songIdx = 0;
const vinylTitle  = document.getElementById('vinyl-title');
const vinylArtist = document.getElementById('vinyl-artist');

function rotateSong() {
  songIdx = (songIdx + 1) % songs.length;
  vinylTitle.style.opacity = '0';
  vinylArtist.style.opacity = '0';
  setTimeout(() => {
    vinylTitle.textContent  = songs[songIdx].title;
    vinylArtist.textContent = '— ' + songs[songIdx].artist;
    vinylTitle.style.opacity = '1';
    vinylArtist.style.opacity = '1';
  }, 400);
}

vinylTitle.style.transition  = 'opacity 0.4s ease';
vinylArtist.style.transition = 'opacity 0.4s ease';
setInterval(rotateSong, 3500);

// --- Avatar eyes follow mouse (subtle) ---
const avatar = document.querySelector('.avatar__body');
const eyeL   = document.querySelector('.avatar__eye--l');
const eyeR   = document.querySelector('.avatar__eye--r');

if (avatar && eyeL && eyeR) {
  document.addEventListener('mousemove', (e) => {
    const rect = avatar.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 4;
    const dx = (e.clientX - cx) / window.innerWidth;
    const dy = (e.clientY - cy) / window.innerHeight;
    const mx = Math.max(-3, Math.min(3, dx * 6));
    const my = Math.max(-3, Math.min(3, dy * 6));
    [eyeL, eyeR].forEach(eye => {
      eye.style.transform = `translate(${mx}px, ${my}px)`;
    });
  });
}

// --- Parallax on hero bg (subtle) ---
const heroBg = document.querySelector('.hero__bg');
window.addEventListener('scroll', () => {
  if (heroBg) {
    const y = window.scrollY * 0.3;
    heroBg.style.transform = `translateY(${y}px)`;
  }
});

// --- Hobby cards: random gentle wiggle on hover ---
document.querySelectorAll('.hobby-card').forEach(card => {
  card.addEventListener('mouseenter', () => {
    const deg = (Math.random() - 0.5) * 6;
    card.style.transform = `translateY(-5px) rotate(${deg}deg) scale(1.02)`;
  });
  card.addEventListener('mouseleave', () => {
    card.style.transform = '';
  });
});

// --- Typewriter for hero tagline ---
const taglineEl = document.querySelector('.hero__tagline');
if (taglineEl) {
  taglineEl.style.opacity = '0';
  setTimeout(() => {
    taglineEl.style.transition = 'opacity 1.2s ease';
    taglineEl.style.opacity = '1';
  }, 600);
}

// --- Page entrance animation ---
document.addEventListener('DOMContentLoaded', () => {
  document.body.style.opacity = '0';
  document.body.style.transition = 'opacity 0.8s ease';
  requestAnimationFrame(() => {
    document.body.style.opacity = '1';
  });
});
