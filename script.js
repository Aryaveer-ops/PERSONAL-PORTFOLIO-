/**
 * ARYAVEER SHAHI - DEVELOPER PORTFOLIO JAVASCRIPT
 * Vanilla JS implementation of typewriter, scroll observer,
 * mobile drawer, particle background, form validation & modals.
 */

document.addEventListener('DOMContentLoaded', () => {
  initTypewriter();
  initBackgroundCanvas();
  initNavigation();
  initScrollEffects();
  initSkillsObserver();
  initProjectFilters();
  initProjectModal();
  initContactForm();
  initEmailCopy();
  initFooterYear();
});

/* ===================================================================
   1. HERO TYPEWRITER ANIMATION
   =================================================================== */
function initTypewriter() {
  const typewriterEl = document.getElementById('typewriter');
  if (!typewriterEl) return;

  const titles = [
    'Aspiring Software Engineer',
    'Data Science Enthusiast',
    'AI Enthusiast',
    'Web Developer'
  ];

  let titleIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let typingSpeed = 90;

  function typeStep() {
    const currentTitle = titles[titleIndex];

    if (isDeleting) {
      typewriterEl.textContent = currentTitle.substring(0, charIndex - 1);
      charIndex--;
      typingSpeed = 45;
    } else {
      typewriterEl.textContent = currentTitle.substring(0, charIndex + 1);
      charIndex++;
      typingSpeed = 85;
    }

    if (!isDeleting && charIndex === currentTitle.length) {
      // Pause at full word
      typingSpeed = 1900;
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      titleIndex = (titleIndex + 1) % titles.length;
      typingSpeed = 400;
    }

    setTimeout(typeStep, typingSpeed);
  }

  // Start typing with slight delay
  setTimeout(typeStep, 600);
}

/* ===================================================================
   2. INTERACTIVE SUBTLE BACKGROUND PARTICLES
   =================================================================== */
function initBackgroundCanvas() {
  const canvas = document.getElementById('bg-canvas');
  if (!canvas) return;

  // Honor prefers-reduced-motion
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    return;
  }

  const ctx = canvas.getContext('2d');
  let width = (canvas.width = window.innerWidth);
  let height = (canvas.height = window.innerHeight);

  window.addEventListener('resize', () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  });

  const particleCount = Math.min(Math.floor(width / 32), 45);
  const particles = [];

  const colors = ['rgba(139, 92, 246, 0.55)', 'rgba(6, 182, 212, 0.55)', 'rgba(99, 102, 241, 0.45)'];

  for (let i = 0; i < particleCount; i++) {
    particles.push({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
      radius: Math.random() * 2 + 1,
      color: colors[Math.floor(Math.random() * colors.length)]
    });
  }

  function render() {
    ctx.clearRect(0, 0, width, height);

    for (let i = 0; i < particles.length; i++) {
      const p = particles[i];
      p.x += p.vx;
      p.y += p.vy;

      if (p.x < 0) p.x = width;
      if (p.x > width) p.x = 0;
      if (p.y < 0) p.y = height;
      if (p.y > height) p.y = 0;

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      ctx.fillStyle = p.color;
      ctx.fill();

      // Connect nearby particles with subtle line
      for (let j = i + 1; j < particles.length; j++) {
        const p2 = particles[j];
        const dx = p.x - p2.x;
        const dy = p.y - p2.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < 110) {
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(p2.x, p2.y);
          ctx.strokeStyle = `rgba(139, 92, 246, ${0.12 * (1 - dist / 110)})`;
          ctx.lineWidth = 0.8;
          ctx.stroke();
        }
      }
    }

    requestAnimationFrame(render);
  }

  requestAnimationFrame(render);
}

/* ===================================================================
   3. NAVIGATION (STICKY, MOBILE DRAWER & ACTIVE SECTION HIGHLIGHT)
   =================================================================== */
function initNavigation() {
  const header = document.getElementById('header');
  const navToggle = document.getElementById('nav-toggle');
  const drawer = document.getElementById('mobile-drawer');
  const backdrop = document.getElementById('mobile-backdrop');
  const drawerClose = document.getElementById('drawer-close');
  const drawerLinks = document.querySelectorAll('.drawer-link, .drawer-cta');
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section[id]');

  // Sticky header on scroll
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  }, { passive: true });

  // Open / Close Mobile Drawer
  function openDrawer() {
    drawer.classList.add('open');
    backdrop.classList.add('open');
    navToggle.classList.add('open');
    navToggle.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
  }

  function closeDrawer() {
    drawer.classList.remove('open');
    backdrop.classList.remove('open');
    navToggle.classList.remove('open');
    navToggle.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  }

  if (navToggle) {
    navToggle.addEventListener('click', () => {
      const isOpen = drawer.classList.contains('open');
      if (isOpen) {
        closeDrawer();
      } else {
        openDrawer();
      }
    });
  }

  if (drawerClose) drawerClose.addEventListener('click', closeDrawer);
  if (backdrop) backdrop.addEventListener('click', closeDrawer);

  drawerLinks.forEach(link => {
    link.addEventListener('click', closeDrawer);
  });

  // ESC to close drawer
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && drawer.classList.contains('open')) {
      closeDrawer();
    }
  });

  // Active section scroll spy
  function updateActiveNavLink() {
    const scrollPos = window.scrollY + 120;

    sections.forEach(sec => {
      const top = sec.offsetTop;
      const height = sec.offsetHeight;
      const id = sec.getAttribute('id');

      if (scrollPos >= top && scrollPos < top + height) {
        navLinks.forEach(link => {
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
          } else {
            link.classList.remove('active');
          }
        });
      }
    });
  }

  window.addEventListener('scroll', updateActiveNavLink, { passive: true });
}

/* ===================================================================
   4. SCROLL EFFECTS (REVEAL ANIMATIONS, SCROLLBAR & BACK TO TOP)
   =================================================================== */
function initScrollEffects() {
  const progressBar = document.getElementById('scroll-progress');
  const backToTop = document.getElementById('back-to-top');
  const revealElements = document.querySelectorAll('.reveal');

  // Scroll Progress and Back-To-Top
  window.addEventListener('scroll', () => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;

    if (progressBar) {
      progressBar.style.width = `${progress}%`;
    }

    if (backToTop) {
      if (scrollTop > 380) {
        backToTop.classList.add('visible');
      } else {
        backToTop.classList.remove('visible');
      }
    }
  }, { passive: true });

  if (backToTop) {
    backToTop.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

  // IntersectionObserver for Reveal Animations
  if ('IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          observer.unobserve(entry.target);
        }
      });
    }, {
      root: null,
      threshold: 0.12,
      rootMargin: '0px 0px -40px 0px'
    });

    revealElements.forEach(el => revealObserver.observe(el));
  } else {
    revealElements.forEach(el => el.classList.add('revealed'));
  }
}

/* ===================================================================
   5. SKILLS PROGRESS OBSERVER
   =================================================================== */
function initSkillsObserver() {
  const skillBars = document.querySelectorAll('.skill-bar-fill');
  if (!skillBars.length) return;

  if ('IntersectionObserver' in window) {
    const skillObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const bar = entry.target;
          const targetWidth = bar.getAttribute('data-progress') || '70%';
          bar.style.width = targetWidth;
          observer.unobserve(bar);
        }
      });
    }, { threshold: 0.3 });

    skillBars.forEach(bar => skillObserver.observe(bar));
  } else {
    skillBars.forEach(bar => {
      bar.style.width = bar.getAttribute('data-progress') || '70%';
    });
  }
}

/* ===================================================================
   6. PROJECT FILTERS
   =================================================================== */
function initProjectFilters() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  if (!filterBtns.length || !projectCards.length) return;

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterVal = btn.getAttribute('data-filter');

      projectCards.forEach(card => {
        const category = card.getAttribute('data-category');
        if (filterVal === 'all' || category === filterVal) {
          card.style.display = 'flex';
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          }, 40);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'translateY(15px)';
          setTimeout(() => {
            card.style.display = 'none';
          }, 250);
        }
      });
    });
  });
}

/* ===================================================================
   7. PROJECT LIVE DEMO MODAL
   =================================================================== */
function initProjectModal() {
  const modal = document.getElementById('demo-modal');
  const modalBackdrop = document.getElementById('modal-backdrop');
  const modalClose = document.getElementById('modal-close');
  const modalDismiss = document.getElementById('modal-dismiss');
  const modalTitle = document.getElementById('modal-title');
  const modalDesc = document.getElementById('modal-desc');
  const modalTags = document.getElementById('modal-tags');
  const modalUrl = document.getElementById('modal-url');

  if (!modal) return;

  const demoTriggers = document.querySelectorAll('.demo-modal-trigger');

  function openModal(data) {
    modalTitle.textContent = data.project || 'Project Preview';
    modalDesc.textContent = data.desc || '';
    modalUrl.setAttribute('href', data.url || '#');

    // Tags
    modalTags.innerHTML = '';
    const tags = (data.tech || '').split(',').map(t => t.trim());
    tags.forEach(t => {
      if (t) {
        const span = document.createElement('span');
        span.className = 'tech-tag';
        span.textContent = t;
        modalTags.appendChild(span);
      }
    });

    modal.removeAttribute('hidden');
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    modal.setAttribute('hidden', '');
    document.body.style.overflow = '';
  }

  demoTriggers.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      openModal({
        project: btn.getAttribute('data-project'),
        tech: btn.getAttribute('data-tech'),
        desc: btn.getAttribute('data-desc'),
        url: btn.getAttribute('data-url')
      });
    });
  });

  if (modalClose) modalClose.addEventListener('click', closeModal);
  if (modalDismiss) modalDismiss.addEventListener('click', closeModal);
  if (modalBackdrop) modalBackdrop.addEventListener('click', closeModal);

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !modal.hasAttribute('hidden')) {
      closeModal();
    }
  });
}

/* ===================================================================
   8. CONTACT FORM CLIENT-SIDE VALIDATION & NOTIFICATION
   =================================================================== */
function initContactForm() {
  const form = document.getElementById('contact-form');
  if (!form) return;

  const nameInput = document.getElementById('name');
  const emailInput = document.getElementById('email');
  const subjectInput = document.getElementById('subject');
  const messageInput = document.getElementById('message');
  const submitBtn = document.getElementById('submit-btn');
  const submitBtnText = document.getElementById('submit-btn-text');

  function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  }

  function setError(input, errorId, show) {
    const errorEl = document.getElementById(errorId);
    if (show) {
      input.classList.add('is-invalid');
      if (errorEl) errorEl.classList.add('visible');
    } else {
      input.classList.remove('is-invalid');
      if (errorEl) errorEl.classList.remove('visible');
    }
  }

  // Real-time input clearing of errors
  nameInput.addEventListener('input', () => {
    if (nameInput.value.trim().length >= 2) setError(nameInput, 'name-error', false);
  });

  emailInput.addEventListener('input', () => {
    if (validateEmail(emailInput.value.trim())) setError(emailInput, 'email-error', false);
  });

  subjectInput.addEventListener('input', () => {
    if (subjectInput.value.trim().length >= 3) setError(subjectInput, 'subject-error', false);
  });

  messageInput.addEventListener('input', () => {
    if (messageInput.value.trim().length >= 10) setError(messageInput, 'message-error', false);
  });

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    let isValid = true;

    // Validate Name
    if (nameInput.value.trim().length < 2) {
      setError(nameInput, 'name-error', true);
      isValid = false;
    } else {
      setError(nameInput, 'name-error', false);
    }

    // Validate Email
    if (!validateEmail(emailInput.value.trim())) {
      setError(emailInput, 'email-error', true);
      isValid = false;
    } else {
      setError(emailInput, 'email-error', false);
    }

    // Validate Subject
    if (subjectInput.value.trim().length < 3) {
      setError(subjectInput, 'subject-error', true);
      isValid = false;
    } else {
      setError(subjectInput, 'subject-error', false);
    }

    // Validate Message
    if (messageInput.value.trim().length < 10) {
      setError(messageInput, 'message-error', true);
      isValid = false;
    } else {
      setError(messageInput, 'message-error', false);
    }

    if (!isValid) {
      showToast('Please correct highlighted fields before submitting.', 'info');
      return;
    }

    // Simulate sending state
    submitBtn.disabled = true;
    const originalContent = submitBtn.innerHTML;
    submitBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Sending Message...';

    setTimeout(() => {
      submitBtn.disabled = false;
      submitBtn.innerHTML = originalContent;
      form.reset();

      showToast('Thank you! Your message was validated successfully. (Connect backend e.g. Formspree/EmailJS for email delivery).', 'success');
    }, 1200);
  });
}

/* ===================================================================
   9. EMAIL COPY TO CLIPBOARD
   =================================================================== */
function initEmailCopy() {
  const copyBtn = document.getElementById('copy-email-btn');
  const emailTextEl = document.getElementById('email-text');

  if (!copyBtn || !emailTextEl) return;

  copyBtn.addEventListener('click', (e) => {
    e.preventDefault();
    const email = emailTextEl.textContent.trim();

    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(email)
        .then(() => {
          showToast(`Copied ${email} to clipboard!`, 'success');
        })
        .catch(() => {
          fallbackCopyText(email);
        });
    } else {
      fallbackCopyText(email);
    }
  });

  function fallbackCopyText(text) {
    const textArea = document.createElement('textarea');
    textArea.value = text;
    textArea.style.position = 'fixed';
    textArea.style.left = '-9999px';
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    try {
      document.execCommand('copy');
      showToast(`Copied ${text} to clipboard!`, 'success');
    } catch (err) {
      showToast('Failed to copy. Please copy manually.', 'info');
    }
    document.body.removeChild(textArea);
  }
}

/* ===================================================================
   10. TOAST NOTIFICATION UTILITY
   =================================================================== */
function showToast(message, type = 'info') {
  const container = document.getElementById('toast-container');
  if (!container) return;

  const toast = document.createElement('div');
  toast.className = `toast toast-${type}`;

  const icon = type === 'success' ? 'fa-solid fa-circle-check' : 'fa-solid fa-circle-info';
  toast.innerHTML = `<i class="${icon}"></i> <span>${message}</span>`;

  container.appendChild(toast);

  setTimeout(() => {
    if (toast.parentNode) {
      toast.parentNode.removeChild(toast);
    }
  }, 4000);
}

/* ===================================================================
   11. DYNAMIC FOOTER YEAR
   =================================================================== */
function initFooterYear() {
  const yearEl = document.getElementById('current-year');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }
}