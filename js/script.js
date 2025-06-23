
// Mobile Navigation Toggle
const navToggle = document.getElementById('navToggle');
const navMenu = document.getElementById('navMenu');

navToggle.addEventListener('click', () => {
  navMenu.classList.toggle('active');
  navToggle.classList.toggle('active');
});

// Close mobile menu when clicking on links
const navLinks = document.querySelectorAll('.nav-link');
navLinks.forEach(link => {
  link.addEventListener('click', () => {
    navMenu.classList.remove('active');
    navToggle.classList.remove('active');
  });
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      const offsetTop = target.offsetTop - 80; // Account for fixed navbar
      window.scrollTo({
        top: offsetTop,
        behavior: 'smooth'
      });
    }
  });
});

// Navbar background on scroll
window.addEventListener('scroll', () => {
  const navbar = document.querySelector('.navbar');
  if (window.scrollY > 50) {
    navbar.style.background = 'rgba(255, 255, 255, 0.98)';
  } else {
    navbar.style.background = 'rgba(255, 255, 255, 0.95)';
  }
});

// Contact form handling
const contactForm = document.getElementById('contactForm');
if (contactForm) {
  contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Get form data
    const formData = new FormData(this);
    const data = {
      name: formData.get('name'),
      email: formData.get('email'),
      phone: formData.get('phone'),
      service: formData.get('service'),
      message: formData.get('message')
    };
    
    // Validate required fields
    if (!data.name || !data.email || !data.service) {
      showAlert('Por favor, preencha todos os campos obrigatórios.', 'error');
      return;
    }
    
    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email)) {
      showAlert('Por favor, insira um email válido.', 'error');
      return;
    }
    
    // Simulate form submission
    showAlert('Mensagem enviada com sucesso! Entraremos em contato em breve.', 'success');
    
    // Clear form
    this.reset();
    
    // In a real application, you would send the data to your server
    console.log('Form data:', data);
  });
}

// Alert function
function showAlert(message, type = 'info') {
  // Remove existing alerts
  const existingAlert = document.querySelector('.alert');
  if (existingAlert) {
    existingAlert.remove();
  }
  
  // Create alert element
  const alert = document.createElement('div');
  alert.className = `alert alert-${type}`;
  alert.style.cssText = `
    position: fixed;
    top: 100px;
    right: 20px;
    background: ${type === 'success' ? '#10b981' : type === 'error' ? '#ef4444' : '#3b82f6'};
    color: white;
    padding: 1rem 1.5rem;
    border-radius: 0.5rem;
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
    z-index: 1001;
    max-width: 400px;
    transform: translateX(100%);
    transition: transform 0.3s ease;
  `;
  alert.textContent = message;
  
  // Add to document
  document.body.appendChild(alert);
  
  // Animate in
  setTimeout(() => {
    alert.style.transform = 'translateX(0)';
  }, 100);
  
  // Remove after 5 seconds
  setTimeout(() => {
    alert.style.transform = 'translateX(100%)';
    setTimeout(() => {
      if (alert.parentNode) {
        alert.parentNode.removeChild(alert);
      }
    }, 300);
  }, 5000);
}

// Animate elements on scroll
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('fade-in-up');
    }
  });
}, observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', () => {
  const elementsToAnimate = document.querySelectorAll('.service-card, .value-item, .contact-item');
  elementsToAnimate.forEach(el => {
    observer.observe(el);
  });
});

// WhatsApp integration
function openWhatsApp(message = '') {
  const phone = '5511999999999'; // Replace with actual phone number
  const defaultMessage = message || 'Olá! Gostaria de saber mais sobre os serviços de estruturação de negócio online.';
  const encodedMessage = encodeURIComponent(defaultMessage);
  const whatsappUrl = `https://wa.me/${phone}?text=${encodedMessage}`;
  window.open(whatsappUrl, '_blank');
}

// Add WhatsApp functionality to buttons
document.addEventListener('DOMContentLoaded', () => {
  const whatsappBtns = document.querySelectorAll('.whatsapp-btn');
  whatsappBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      openWhatsApp();
    });
  });
});

// Add click functionality to service cards for WhatsApp
document.addEventListener('DOMContentLoaded', () => {
  const serviceCards = document.querySelectorAll('.service-card');
  serviceCards.forEach(card => {
    card.addEventListener('click', () => {
      const serviceName = card.querySelector('h3').textContent;
      const message = `Olá! Tenho interesse no serviço: ${serviceName}. Gostaria de saber mais informações.`;
      openWhatsApp(message);
    });
    
    // Add cursor pointer to indicate clickability
    card.style.cursor = 'pointer';
  });
});

// Performance optimization: Lazy load images (if any are added later)
function lazyLoadImages() {
  const images = document.querySelectorAll('img[data-src]');
  const imageObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src;
        img.removeAttribute('data-src');
        imageObserver.unobserve(img);
      }
    });
  });
  
  images.forEach(img => imageObserver.observe(img));
}

// Initialize lazy loading
document.addEventListener('DOMContentLoaded', lazyLoadImages);

// Add loading animation for better UX
document.addEventListener('DOMContentLoaded', () => {
  // Remove loading class if exists
  document.body.classList.remove('loading');
  
  // Add loaded class for any CSS animations
  document.body.classList.add('loaded');
});

// Keyboard navigation support
document.addEventListener('keydown', (e) => {
  // ESC key closes mobile menu
  if (e.key === 'Escape') {
    navMenu.classList.remove('active');
    navToggle.classList.remove('active');
  }
});

// Add focus management for accessibility
const focusableElements = 'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';

function trapFocus(element) {
  const focusableContent = element.querySelectorAll(focusableElements);
  const firstFocusableElement = focusableContent[0];
  const lastFocusableElement = focusableContent[focusableContent.length - 1];

  document.addEventListener('keydown', function(e) {
    const isTabPressed = e.key === 'Tab' || e.keyCode === 9;

    if (!isTabPressed) return;

    if (e.shiftKey) {
      if (document.activeElement === firstFocusableElement) {
        lastFocusableElement.focus();
        e.preventDefault();
      }
    } else {
      if (document.activeElement === lastFocusableElement) {
        firstFocusableElement.focus();
        e.preventDefault();
      }
    }
  });
}

// Console log for debugging
console.log('Negócio Online - Site loaded successfully!');
console.log('Features initialized: Mobile menu, smooth scrolling, form handling, WhatsApp integration');
