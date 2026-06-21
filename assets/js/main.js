document.addEventListener('DOMContentLoaded', () => {
  // Mobile Menu Toggle
  const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
  const navLinks = document.querySelector('.nav-links');

  if (mobileMenuBtn && navLinks) {
    mobileMenuBtn.addEventListener('click', () => {
      navLinks.classList.toggle('active');
    });
  }

  // Smooth scroll for section anchor links (exclude modal triggers/closes)
  document.querySelectorAll('a[href^="#"]:not(.modal-close):not(.open-modal-btn):not([href$="-modal"])').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const href = this.getAttribute('href');
      if (href === '#') return;
      const target = document.querySelector(href);
      if (target) {
        // Close mobile menu if open
        if (navLinks) {
          navLinks.classList.remove('active');
        }
        target.scrollIntoView({
          behavior: 'smooth'
        });
      }
    });
  });

  // Modal Handling Logic
  const modals = document.querySelectorAll('.modal');
  let lastFocusedElement = null;

  function openModal(modalId) {
    const modal = document.querySelector(modalId);
    if (!modal) return;

    lastFocusedElement = document.activeElement;
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';

    // Focus on close button or modal container for accessibility
    const closeBtn = modal.querySelector('.modal-close');
    if (closeBtn) {
      closeBtn.focus();
    }
  }

  function closeModal() {
    modals.forEach(modal => {
      modal.classList.remove('active');
    });
    document.body.style.overflow = '';
    
    // Clear hash without scroll jump
    if (window.location.hash && window.location.hash.endsWith('-modal')) {
      history.pushState("", document.title, window.location.pathname + window.location.search);
    }

    if (lastFocusedElement) {
      lastFocusedElement.focus();
      lastFocusedElement = null;
    }
  }

  // Handle Hash Changes for Modals
  function checkHash() {
    const hash = window.location.hash;
    if (hash && hash.endsWith('-modal')) {
      openModal(hash);
    } else {
      closeModal();
    }
  }

  window.addEventListener('hashchange', checkHash);
  
  // Initial check on load
  checkHash();

  // Close modal when clicking on background overlay
  modals.forEach(modal => {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        closeModal();
      }
    });
  });

  // Close modal with Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      const activeModal = document.querySelector('.modal.active');
      if (activeModal) {
        closeModal();
      }
    }
  });
});
