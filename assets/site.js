// Mobile Navigation Toggle
const mobileBtn = document.getElementById('mobileMenuBtn');
const mobileDropdown = document.getElementById('mobileDropdown');
if (mobileBtn && mobileDropdown) {
  mobileBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    mobileDropdown.classList.toggle('hidden');
    mobileDropdown.classList.toggle('flex');
  });

  mobileDropdown.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      mobileDropdown.classList.add('hidden');
      mobileDropdown.classList.remove('flex');
    });
  });

  // Close dropdown on outside tap / click
  document.addEventListener('click', (e) => {
    if (!mobileBtn.contains(e.target) && !mobileDropdown.contains(e.target)) {
      mobileDropdown.classList.add('hidden');
      mobileDropdown.classList.remove('flex');
    }
  });
}

// Dynamic Current Year
const yearSpan = document.getElementById('year');
if (yearSpan) {
  yearSpan.textContent = new Date().getFullYear();
}

// Dynamic Navbar Transparency on Hero Section
const siteHeader = document.getElementById('siteHeader');
const heroSection = document.getElementById('heroSection');

function updateHeaderTransparency() {
  if (!siteHeader || !heroSection) return;
  const heroRect = heroSection.getBoundingClientRect();
  // Header height is 64px. If bottom of hero section is above 64px, user has scrolled past hero
  const isPastHero = heroRect.bottom <= 64;

  if (isPastHero) {
    // Scrolled past hero: restore solid dark background, blur, and shadow
    siteHeader.classList.remove('bg-transparent', 'shadow-none', 'border-transparent');
    siteHeader.classList.add('bg-[#061329]/95', 'backdrop-blur-md', 'shadow-[0_1px_8px_rgba(0,0,0,0.18)]', 'border-b', 'border-white/10');
  } else {
    // Inside hero: transparent navbar blending into the hero gradient
    siteHeader.classList.add('bg-transparent', 'shadow-none', 'border-transparent');
    siteHeader.classList.remove('bg-[#061329]/95', 'backdrop-blur-md', 'shadow-[0_1px_8px_rgba(0,0,0,0.18)]', 'border-b', 'border-white/10');
  }
}

window.addEventListener('scroll', updateHeaderTransparency, { passive: true });
window.addEventListener('resize', updateHeaderTransparency);
// Run initially on page load
updateHeaderTransparency();

// Consultation Form Submission Handler
const consultForm = document.getElementById('consultation-form');
const formSuccess = document.getElementById('form-success');
if (consultForm) {
  consultForm.addEventListener('submit', (e) => {
    e.preventDefault();
    if (formSuccess) {
      consultForm.classList.add('hidden');
      formSuccess.classList.remove('hidden');
    }
  });
}

// Scroll Reveal Animations via IntersectionObserver
if ('IntersectionObserver' in window) {
  document.documentElement.classList.add('js-reveal');

  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-revealed');
        observer.unobserve(entry.target);
      }
    });
  }, {
    root: null,
    rootMargin: '0px 0px -40px 0px',
    threshold: 0.05
  });

  document.querySelectorAll('.reveal-on-scroll').forEach(el => {
    revealObserver.observe(el);
  });
}

// Floating Back to Top Button
const backToTopBtn = document.getElementById('backToTopBtn');
if (backToTopBtn) {
  function updateBackToTopVisibility() {
    if (window.scrollY > 350) {
      backToTopBtn.classList.remove('opacity-0', 'pointer-events-none', 'translate-y-4');
      backToTopBtn.classList.add('opacity-100', 'translate-y-0');
    } else {
      backToTopBtn.classList.add('opacity-0', 'pointer-events-none', 'translate-y-4');
      backToTopBtn.classList.remove('opacity-100', 'translate-y-0');
    }
  }

  backToTopBtn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });

  window.addEventListener('scroll', updateBackToTopVisibility, { passive: true });
  updateBackToTopVisibility();
}
