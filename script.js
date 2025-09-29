// script.js
document.addEventListener('DOMContentLoaded', function() {
  // Set current year in footer
  document.getElementById('currentYear').textContent = new Date().getFullYear();
  
  // Header scroll effect
  const header = document.querySelector('.header');
  window.addEventListener('scroll', function() {
    if (window.scrollY > 100) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });
  
  // Mobile menu toggle
  const burger = document.getElementById('burger');
  const nav = document.getElementById('nav');
  
  burger.addEventListener('click', function() {
    burger.classList.toggle('open');
    nav.classList.toggle('open');
    document.body.classList.toggle('no-scroll');
  });
  
  // Close mobile menu when clicking on a link
  const navLinks = document.querySelectorAll('.nav-link');
  navLinks.forEach(link => {
    link.addEventListener('click', function() {
      burger.classList.remove('open');
      nav.classList.remove('open');
      document.body.classList.remove('no-scroll');
    });
  });
  
  // Active navigation link
  function setActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const scrollPos = window.scrollY + 100;
    
    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute('id');
      
      if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
        document.querySelectorAll('.nav-link').forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('active');
          }
        });
      }
    });
  }
  
  window.addEventListener('scroll', setActiveNavLink);
  
  // Work cards modal
  const workCards = document.querySelectorAll('.work-card');
  const modal = document.getElementById('modal');
  const modalTitle = document.getElementById('modalTitle');
  const modalDescription = document.getElementById('modalDescription');
  const modalClose = document.getElementById('modalClose');
  
  workCards.forEach(card => {
    card.addEventListener('click', function() {
      const title = this.getAttribute('data-title');
      const description = this.getAttribute('data-description');
      
      modalTitle.textContent = title;
      modalDescription.textContent = description;
      modal.setAttribute('aria-hidden', 'false');
      document.body.classList.add('no-scroll');
    });
  });
  
  // Close modal
  modalClose.addEventListener('click', function() {
    closeModal();
  });
  
  modal.addEventListener('click', function(e) {
    if (e.target === modal || e.target.classList.contains('modal-backdrop')) {
      closeModal();
    }
  });
  
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && modal.getAttribute('aria-hidden') === 'false') {
      closeModal();
    }
  });
  
  function closeModal() {
    modal.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('no-scroll');
  }
  
  // Contact form
  const contactForm = document.getElementById('contactForm');
  const formMessage = document.getElementById('formMessage');
  
  contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Simple form validation
    const name = document.getElementById('name').value.trim();
    const phone = document.getElementById('phone').value.trim();
    const message = document.getElementById('message').value.trim();
    
    if (!name || !phone || !message) {
      showFormMessage('Пожалуйста, заполните все обязательные поля', 'error');
      return;
    }
    
    // Simulate form submission
    showFormMessage('Спасибо! Ваша заявка отправлена. Мы свяжемся с вами в течение часа.', 'success');
    contactForm.reset();
    
    // Reset form labels
    const labels = contactForm.querySelectorAll('label');
    labels.forEach(label => {
      label.style.top = '16px';
      label.style.left = '16px';
      label.style.fontSize = '1rem';
      label.style.background = 'transparent';
      label.style.color = 'var(--gray)';
    });
  });
  
  function showFormMessage(text, type) {
    formMessage.textContent = text;
    formMessage.className = `form-message ${type}`;
    
    setTimeout(() => {
      formMessage.textContent = '';
      formMessage.className = 'form-message';
    }, 5000);
  }
  
  // Form label animation fix
  const formInputs = contactForm.querySelectorAll('input, textarea');
  formInputs.forEach(input => {
    input.addEventListener('blur', function() {
      if (this.value.trim() !== '') {
        const label = this.nextElementSibling;
        label.style.top = '-10px';
        label.style.left = '10px';
        label.style.fontSize = '0.8rem';
        label.style.background = 'var(--dark)';
        label.style.color = 'var(--primary)';
      }
    });
  });
  
  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        const headerHeight = document.querySelector('.header').offsetHeight;
        const targetPosition = targetElement.offsetTop - headerHeight;
        
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  });
  
  // Intersection Observer for animations
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };
  
  const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate-in');
      }
    });
  }, observerOptions);
  
  // Observe elements for animation
  const animateElements = document.querySelectorAll('.service-card, .work-card, .about-content, .contact-form-container');
  animateElements.forEach(el => {
    el.classList.add('animate-on-scroll');
    observer.observe(el);
  });
  
  // Add CSS for animations
  const style = document.createElement('style');
  style.textContent = `
    .animate-on-scroll {
      opacity: 0;
      transform: translateY(30px);
      transition: opacity 0.6s ease, transform 0.6s ease;
    }
    
    .animate-on-scroll.animate-in {
      opacity: 1;
      transform: translateY(0);
    }
    
    .no-scroll {
      overflow: hidden;
    }
  `;
  document.head.appendChild(style);
});