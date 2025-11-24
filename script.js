/* ===== script.js (shared) =====
 - mobile menu toggle + overlay
 - smooth scroll for internal links
 - (Home only) hero slider auto and arrows — safe to run on all pages; slides only present on home
 - newsletter & contact basic front-end validation
 - About page enhancements
*/

// Mobile menu toggle & overlay
(function(){
  const toggle = document.querySelector('.menu-toggle');
  const mobileNav = document.querySelector('.mobile-nav');
  const overlay = document.createElement('div');
  overlay.className = 'menu-overlay';
  document.body.appendChild(overlay);

  if(toggle && mobileNav){
    toggle.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      mobileNav.classList.toggle('open');
      overlay.classList.toggle('active');
      document.body.classList.toggle('menu-open');
      
      // Change toggle button text
      if(mobileNav.classList.contains('open')) {
        toggle.textContent = '✕';
      } else {
        toggle.textContent = '☰';
      }
    });
  }

  // close mobile nav when clicking overlay
  overlay.addEventListener('click', ()=> {
    if(mobileNav) {
      mobileNav.classList.remove('open');
      overlay.classList.remove('active');
      document.body.classList.remove('menu-open');
      if(toggle) toggle.textContent = '☰';
    }
  });

  // Mobile Dropd toggle functionality
  const mobileDropds = document.querySelectorAll('.mobile-nav .Dropd-toggle');
  mobileDropds.forEach(DropdToggle => {
    DropdToggle.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      const Dropd = DropdToggle.parentElement;
      const isActive = Dropd.classList.contains('active');
      
      // Close all other Dropds
      document.querySelectorAll('.mobile-nav .Dropd').forEach(d => {
        d.classList.remove('active');
      });
      
      // Toggle current Dropd
      if (!isActive) {
        Dropd.classList.add('active');
      }
    });
  });

  // Close mobile nav when clicking on a link
  const mobileNavLinks = document.querySelectorAll('.mobile-nav a:not(.Dropd-toggle)');
  mobileNavLinks.forEach(link => {
    link.addEventListener('click', () => {
      if(mobileNav) {
        mobileNav.classList.remove('open');
        overlay.classList.remove('active');
        document.body.classList.remove('menu-open');
        if(toggle) toggle.textContent = '☰';
      }
    });
  });

  // smooth scroll for anchors
  document.querySelectorAll('a[href^="#"]').forEach(a=>{
    a.addEventListener('click', function(e){
      const href = this.getAttribute('href');
      if(href.length>1 && document.querySelector(href)){
        e.preventDefault();
        document.querySelector(href).scrollIntoView({behavior:'smooth', block:'start'});
        // close mobile nav if open
        if(mobileNav) { 
          mobileNav.classList.remove('open'); 
          overlay.classList.remove('active'); 
          document.body.classList.remove('menu-open');
          if(toggle) toggle.textContent = '☰';
        }
      }
    });
  });

  // Add global function for closing mobile nav
  window.closeMobileNav = function() {
    const mobileNav = document.querySelector('.mobile-nav');
    const overlay = document.querySelector('.menu-overlay');
    const toggle = document.querySelector('.menu-toggle');
    
    if(mobileNav) mobileNav.classList.remove('open');
    if(overlay) overlay.classList.remove('active');
    document.body.classList.remove('menu-open');
    if(toggle) toggle.textContent = '☰';
  };
})();

// Hero slider (only if slides exist)
(function(){
  const slides = document.querySelectorAll('.slide');
  if(!slides.length) return;
  let idx = 0;
  const nextBtn = document.querySelector('.slider-next');
  const prevBtn = document.querySelector('.slider-prev');
  function show(i){
    slides.forEach(s=>s.classList.remove('active'));
    slides[(i+slides.length)%slides.length].classList.add('active');
  }
  function next(){ idx = (idx+1)%slides.length; show(idx) }
  function prev(){ idx = (idx-1+slides.length)%slides.length; show(idx) }

  // auto
  let timer = setInterval(next, 4200);

  // arrows (if present)
  const nbtn = document.getElementById('hero-next');
  const pbtn = document.getElementById('hero-prev');
  if(nbtn) nbtn.addEventListener('click', ()=>{ next(); resetTimer(); });
  if(pbtn) pbtn.addEventListener('click', ()=>{ prev(); resetTimer(); });

  function resetTimer(){
    clearInterval(timer);
    timer = setInterval(next, 4200);
  }
})();

// Forms: newsletter and contact simple validation
(function(){
  // newsletter forms (may be present multiple pages)
  document.querySelectorAll('.newsletter-form').forEach(form=>{
    form.addEventListener('submit', function(e){
      e.preventDefault();
      const email = this.querySelector('input[type="email"]')?.value || '';
      if(!email.includes('@')) { alert('Please enter a valid email address'); return; }
      alert('Thanks — subscribed!');
      this.reset();
    });
  });

  // contact forms
  document.querySelectorAll('.contact-form').forEach(form=>{
    form.addEventListener('submit', function(e){
      e.preventDefault();
      const name = this.querySelector('input[name="name"]')?.value.trim();
      const email = this.querySelector('input[name="email"]')?.value.trim();
      const msg = this.querySelector('textarea[name="message"]')?.value.trim();
      if(!name || !email || !msg){ alert('Please fill all fields'); return; }
      if(!email.includes('@')){ alert('Please enter a valid email'); return; }
      alert('Message sent — thank you!');
      this.reset();
    });
  });
})();



// About Page Enhancements
(function(){
  // Animate sections on scroll
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate-in');
      }
    });
  }, observerOptions);

  // Observe all about sections
  document.querySelectorAll('.about-section, .service-section').forEach(section => {
    observer.observe(section);
  });

  // Magazine cover interactions
  const magazineCovers = document.querySelectorAll('.cover-item');
  magazineCovers.forEach((cover, index) => {
    // Add staggered animation delay
    cover.style.animationDelay = `${index * 0.1}s`;
    
    // Add click event for magazine details
    cover.addEventListener('click', function() {
      const magazineName = this.querySelector('p').textContent;
      showMagazineDetails(magazineName);
    });
    
    // Enhanced hover effects
    cover.addEventListener('mouseenter', function() {
      this.style.transform = 'translateY(-8px) scale(1.05)';
    });
    
    cover.addEventListener('mouseleave', function() {
      this.style.transform = 'translateY(0) scale(1)';
    });
  });

  // Vision points animation
  const visionPoints = document.querySelectorAll('.vision-point');
  visionPoints.forEach((point, index) => {
    point.style.animationDelay = `${index * 0.2}s`;
    
    // Add click to expand functionality
    point.addEventListener('click', function() {
      this.classList.toggle('expanded');
    });
  });

  // Mission highlight interaction
  const missionHighlight = document.querySelector('.mission-highlight');
  if (missionHighlight) {
    missionHighlight.addEventListener('click', function() {
      this.classList.toggle('pulse');
      setTimeout(() => {
        this.classList.remove('pulse');
      }, 1000);
    });
  }

  // Service section interactions
  const serviceSections = document.querySelectorAll('.service-section');
  serviceSections.forEach(section => {
    const heading = section.querySelector('h3');
    if (heading) {
      heading.addEventListener('click', function() {
        section.classList.toggle('expanded');
      });
    }
  });

  // Brand section interaction
  const brandSection = document.querySelector('.brand-section');
  if (brandSection) {
    brandSection.addEventListener('click', function() {
      this.classList.toggle('highlight');
      setTimeout(() => {
        this.classList.remove('highlight');
      }, 2000);
    });
  }

  // Smooth scroll to sections
  function scrollToSection(sectionId) {
    const section = document.querySelector(sectionId);
    if (section) {
      section.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  }

  // Add navigation for about page sections
  const aboutNav = document.createElement('div');
  aboutNav.className = 'about-nav';
  aboutNav.innerHTML = `
    <div class="about-nav-inner">
      <button onclick="scrollToSection('#mission')">Mission</button>
      <button onclick="scrollToSection('#vision')">Vision</button>
      <button onclick="scrollToSection('#services')">Services</button>
      <button onclick="scrollToSection('#brands')">Brands</button>
    </div>
  `;

  // Insert navigation after the first about section
  const firstSection = document.querySelector('.about-section');
  if (firstSection) {
    firstSection.parentNode.insertBefore(aboutNav, firstSection.nextSibling);
  }

  // Magazine details modal
  function showMagazineDetails(magazineName) {
    const modal = document.createElement('div');
    modal.className = 'magazine-modal';
    modal.innerHTML = `
      <div class="magazine-modal-content">
        <div class="magazine-modal-header">
          <h3>${magazineName}</h3>
          <button class="close-btn" onclick="this.parentElement.parentElement.parentElement.remove()">&times;</button>
        </div>
        <div class="magazine-modal-body">
          <p>Detailed information about ${magazineName} magazine will be displayed here.</p>
          <p>This magazine is part of the Media India Group portfolio.</p>
        </div>
      </div>
    `;
    
    document.body.appendChild(modal);
    
    // Close modal when clicking outside
    modal.addEventListener('click', function(e) {
      if (e.target === this) {
        this.remove();
      }
    });
  }

  // Add global function for section scrolling
  window.scrollToSection = scrollToSection;

  // Add global function for closing mobile nav
  window.closeMobileNav = function() {
    const mobileNav = document.querySelector('.mobile-nav');
    const overlay = document.querySelector('.menu-overlay');
    const toggle = document.querySelector('.menu-toggle');
    
    if(mobileNav) mobileNav.classList.remove('open');
    if(overlay) overlay.classList.remove('active');
    if(toggle) toggle.textContent = '☰';
  };

  // Add loading animation for images
  const images = document.querySelectorAll('img');
  images.forEach(img => {
    img.addEventListener('load', function() {
      this.classList.add('loaded');
    });
    
    if (img.complete) {
      img.classList.add('loaded');
    }
  });

  // Add scroll progress indicator
  const progressBar = document.createElement('div');
  progressBar.className = 'scroll-progress';
  document.body.appendChild(progressBar);

  window.addEventListener("scroll", function() {
    const header = document.querySelector("header");
    if (window.scrollY > 50) {
      header.classList.add("sticky");
    } else {
      header.classList.remove("sticky");
    }
  });


})();

// MIGTV Video Slider with Swiper.js
(function(){
  // Initialize Swiper only if available
  if (typeof Swiper !== 'undefined') {
    const migtvSwiper = new Swiper('.migtv-swiper', {
    // Optional parameters
    direction: 'horizontal',
    loop: true,
    slidesPerView: 1,
    spaceBetween: 30,
    centeredSlides: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false,
    },
    
    // Responsive breakpoints
    breakpoints: {
      640: {
        slidesPerView: 1,
        spaceBetween: 20,
      },
      768: {
        slidesPerView: 2,
        spaceBetween: 30,
      },
      1024: {
        slidesPerView: 3,
        spaceBetween: 30,
      },
    },
    
    // Navigation arrows
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
    
    // Pagination
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
    },
    
    // Effect
    effect: 'slide',
    
    // Speed
    speed: 600,
    });
  }
  
  // Magazine Slider Functions
  let currentMagazineIndex = 1;
  const totalMagazines = 5;
  
  window.changeMagazine = function(direction) {
    const slides = document.querySelectorAll('.magazine-slide');
    const dots = document.querySelectorAll('.magazine-dot');
    
    // Remove active class from current slide and dot
    slides[currentMagazineIndex - 1].classList.remove('active');
    dots[currentMagazineIndex - 1].classList.remove('active');
    
    // Calculate new index
    currentMagazineIndex += direction;
    
    // Handle loop
    if (currentMagazineIndex > totalMagazines) {
      currentMagazineIndex = 1;
    } else if (currentMagazineIndex < 1) {
      currentMagazineIndex = totalMagazines;
    }
    
    // Add active class to new slide and dot
    slides[currentMagazineIndex - 1].classList.add('active');
    dots[currentMagazineIndex - 1].classList.add('active');
  };
  
  window.currentMagazine = function(index) {
    const slides = document.querySelectorAll('.magazine-slide');
    const dots = document.querySelectorAll('.magazine-dot');
    
    // Remove active class from all slides and dots
    slides.forEach(slide => slide.classList.remove('active'));
    dots.forEach(dot => dot.classList.remove('active'));
    
    // Set new index
    currentMagazineIndex = index;
    
    // Add active class to selected slide and dot
    slides[index - 1].classList.add('active');
    dots[index - 1].classList.add('active');
  };
  
  // Auto-advance magazine slider with better loop handling
  let magazineInterval;
  
  function startMagazineAutoLoop() {
    magazineInterval = setInterval(() => {
      changeMagazine(1);
    }, 2500); // Faster auto-advance for better engagement
  }
  
  function stopMagazineAutoLoop() {
    if (magazineInterval) {
      clearInterval(magazineInterval);
    }
  }
  
  function restartMagazineAutoLoop() {
    stopMagazineAutoLoop();
    startMagazineAutoLoop();
  }
  
  // Start auto-loop immediately
  startMagazineAutoLoop();
  
  // Pause auto-advance when user interacts with navigation
  document.querySelectorAll('.magazine-prev, .magazine-next, .magazine-dot').forEach(element => {
    element.addEventListener('click', () => {
      restartMagazineAutoLoop();
    });
  });
  
  // Pause on hover for better user experience
  const magazineSlider = document.querySelector('.magazine-slider');
  if (magazineSlider) {
    magazineSlider.addEventListener('mouseenter', stopMagazineAutoLoop);
    magazineSlider.addEventListener('mouseleave', startMagazineAutoLoop);
  }
  
  // Video modal functions
  window.openVideoModal = function(videoId, title) {
    const modal = document.getElementById('videoModal');
    const videoTitle = document.getElementById('videoTitle');
    const videoIframe = document.getElementById('videoIframe');
    
    videoTitle.textContent = title;
    videoIframe.src = `https://www.youtube.com/embed/${videoId}?autoplay=1`;
    modal.style.display = 'flex';
    
    // Close modal with Escape key
    document.addEventListener('keydown', function closeOnEscape(e) {
      if (e.key === 'Escape') {
        closeVideoModal();
        document.removeEventListener('keydown', closeOnEscape);
      }
    });
  };
  
  window.closeVideoModal = function() {
    const modal = document.getElementById('videoModal');
    const videoIframe = document.getElementById('videoIframe');
    
    modal.style.display = 'none';
    videoIframe.src = ''; // Stop video playback
  };
  
  // Close modal when clicking outside
  const videoModalEl = document.getElementById('videoModal');
  if (videoModalEl) {
    videoModalEl.addEventListener('click', function(e) {
      if (e.target === this) {
        closeVideoModal();
      }
    });
  }
})();

// Contact Page Enhancements
(function(){
  // Form tab switching functionality
  const formTabs = document.querySelectorAll('.form-tab');
  const formContainers = document.querySelectorAll('.contact-form-container');
  
  formTabs.forEach(tab => {
    tab.addEventListener('click', function() {
      const targetForm = this.getAttribute('data-form');
      
      // Remove active class from all tabs and containers
      formTabs.forEach(t => t.classList.remove('active'));
      formContainers.forEach(c => c.classList.remove('active'));
      
      // Add active class to clicked tab and target container
      this.classList.add('active');
      document.getElementById(targetForm).classList.add('active');
    });
  });

  // Enhanced form validation and submission
  const contactForms = document.querySelectorAll('.contact-form');
  
  contactForms.forEach(form => {
    form.addEventListener('submit', function(e) {
      e.preventDefault();
      
      const formData = new FormData(this);
      const formType = this.closest('.contact-form-container').id;
      
      // Basic validation
      let isValid = true;
      const requiredFields = this.querySelectorAll('[required]');
      
      requiredFields.forEach(field => {
        if (!field.value.trim()) {
          isValid = false;
          showFieldError(field, 'This field is required');
        } else {
          clearFieldError(field);
        }
      });
      
      // Email validation
      const emailFields = this.querySelectorAll('input[type="email"]');
      emailFields.forEach(field => {
        if (field.value && !isValidEmail(field.value)) {
          isValid = false;
          showFieldError(field, 'Please enter a valid email address');
        }
      });
      
      // Phone validation
      const phoneFields = this.querySelectorAll('input[type="tel"]');
      phoneFields.forEach(field => {
        if (field.value && !isValidPhone(field.value)) {
          isValid = false;
          showFieldError(field, 'Please enter a valid phone number');
        }
      });
      
      if (isValid) {
        showSuccessMessage(formType);
        this.reset();
      }
    });
  });

  // Field error handling
  function showFieldError(field, message) {
    clearFieldError(field);
    
    const errorDiv = document.createElement('div');
    errorDiv.className = 'field-error';
    errorDiv.textContent = message;
    errorDiv.style.color = '#e74c3c';
    errorDiv.style.fontSize = '0.8rem';
    errorDiv.style.marginTop = '0.3rem';
    
    field.style.borderColor = '#e74c3c';
    field.parentNode.appendChild(errorDiv);
  }

  function clearFieldError(field) {
    const existingError = field.parentNode.querySelector('.field-error');
    if (existingError) {
      existingError.remove();
    }
    field.style.borderColor = '#e9ecef';
  }

  // Validation helpers
  function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  function isValidPhone(phone) {
    const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
    return phoneRegex.test(phone.replace(/\s/g, ''));
  }

  // Success message
  function showSuccessMessage(formType) {
    let message = '';
    let title = '';
    
    switch(formType) {
      case 'write':
        title = 'Thank You!';
        message = 'Your submission has been received. We will review and get back to you soon.';
        break;
      case 'work':
        title = 'Application Submitted!';
        message = 'Thank you for your interest in working with MIG. We will review your application and contact you soon.';
        break;
      case 'advertise':
        title = 'Request Received!';
        message = 'Thank you for your advertising inquiry. Our team will contact you with details and pricing.';
        break;
      case 'partner':
        title = 'Partnership Interest!';
        message = 'Thank you for your partnership inquiry. We will review your proposal and get back to you soon.';
        break;
      case 'newsletter':
        title = 'Subscribed Successfully!';
        message = 'Thank you for subscribing to our newsletter. You will now receive our latest updates and insights.';
        break;
      default:
        title = 'Success!';
        message = 'Your request has been submitted successfully.';
    }
    
    // Create and show modal
    const modal = document.createElement('div');
    modal.className = 'success-modal';
    modal.innerHTML = `
      <div class="success-modal-content">
        <div class="success-icon">✓</div>
        <h3>${title}</h3>
        <p>${message}</p>
        <button onclick="this.parentElement.parentElement.remove()">Close</button>
      </div>
    `;
    
    document.body.appendChild(modal);
    
    // Auto-remove after 5 seconds
    setTimeout(() => {
      if (modal.parentElement) {
        modal.remove();
      }
    }, 5000);
  }

  // Real-time form validation
  const formInputs = document.querySelectorAll('.contact-form input, .contact-form textarea, .contact-form select');
  
  formInputs.forEach(input => {
    input.addEventListener('blur', function() {
      if (this.hasAttribute('required') && !this.value.trim()) {
        showFieldError(this, 'This field is required');
      } else if (this.type === 'email' && this.value && !isValidEmail(this.value)) {
        showFieldError(this, 'Please enter a valid email address');
      } else if (this.type === 'tel' && this.value && !isValidPhone(this.value)) {
        showFieldError(this, 'Please enter a valid phone number');
      } else {
        clearFieldError(this);
      }
    });
    
    input.addEventListener('input', function() {
      if (this.style.borderColor === 'rgb(231, 76, 60)') {
        clearFieldError(this);
      }
    });
  });

  // Contact card interactions
  const contactCards = document.querySelectorAll('.contact-card');
  contactCards.forEach(card => {
    card.addEventListener('click', function() {
      this.style.transform = 'scale(1.02)';
      setTimeout(() => {
        this.style.transform = '';
      }, 200);
    });
  });

  // Location card interactions
  const locationCards = document.querySelectorAll('.location-card');
  locationCards.forEach(card => {
    card.addEventListener('click', function() {
      const locationName = this.querySelector('h3').textContent;
      showLocationDetails(locationName);
    });
  });

  function showLocationDetails(locationName) {
    const details = {
      'Paris Office': {
        address: '47, Avenue de la Republique, 75011, Paris, France',
        phone: '+33 (01) 43573933',
        email: 'paris@mediaindia.eu',
        hours: 'Mon-Fri: 9:00 AM - 6:00 PM (CET)'
      },
      'New Delhi Office': {
        address: 'Media India Group, New Delhi, India',
        phone: '+91 (11) 12345678',
        email: 'delhi@mediaindia.eu',
        hours: 'Mon-Fri: 9:00 AM - 6:00 PM (IST)'
      },
      'Brussels Office': {
        address: 'Media India Group, Brussels, Belgium',
        phone: '+32 (2) 12345678',
        email: 'brussels@mediaindia.eu',
        hours: 'Mon-Fri: 9:00 AM - 6:00 PM (CET)'
      }
    };

    const locationInfo = details[locationName];
    if (locationInfo) {
      const modal = document.createElement('div');
      modal.className = 'location-modal';
      modal.innerHTML = `
        <div class="location-modal-content">
          <div class="location-modal-header">
            <h3>${locationName}</h3>
            <button class="close-btn">&times;</button>
          </div>
          <div class="location-modal-body">
            <p><strong>Address:</strong><br>${locationInfo.address}</p>
            <p><strong>Phone:</strong> ${locationInfo.phone}</p>
            <p><strong>Email:</strong> ${locationInfo.email}</p>
            <p><strong>Business Hours:</strong><br>${locationInfo.hours}</p>
          </div>
        </div>
      `;
      
      modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0,0,0,0.8);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 10000;
        animation: fadeIn 0.3s ease;
      `;
      
      modal.querySelector('.location-modal-content').style.cssText = `
        background: white;
        border-radius: 12px;
        max-width: 500px;
        width: 90%;
        animation: slideIn 0.3s ease;
      `;
      
      modal.querySelector('.location-modal-header').style.cssText = `
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 1.5rem;
        border-bottom: 1px solid #eee;
      `;
      
      modal.querySelector('.location-modal-body').style.cssText = `
        padding: 1.5rem;
      `;
      
      modal.querySelector('.close-btn').style.cssText = `
        background: none;
        border: none;
        font-size: 1.5rem;
        cursor: pointer;
        color: #666;
      `;
      
      document.body.appendChild(modal);
      
      // Close functionality
      modal.querySelector('.close-btn').addEventListener('click', () => {
        modal.remove();
      });
      
      modal.addEventListener('click', (e) => {
        if (e.target === modal) {
          modal.remove();
        }
      });
    }
  }

  // Social link interactions
  const socialLinks = document.querySelectorAll('.social-link');
  socialLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      // Add click animation
      this.style.transform = 'scale(0.95)';
      setTimeout(() => {
        this.style.transform = '';
      }, 150);
    });
  });

  // Newsletter form enhancement
  const newsletterForm = document.querySelector('.newsletter-form');
  if (newsletterForm) {
    newsletterForm.addEventListener('submit', function(e) {
      e.preventDefault();
      const email = this.querySelector('input[type="email"]').value;
      
      if (isValidEmail(email)) {
        showSuccessMessage('newsletter');
        this.reset();
      } else {
        const input = this.querySelector('input[type="email"]');
        showFieldError(input, 'Please enter a valid email address');
      }
    });
  }

})();

// Events Page Enhancements
(function(){
  // Tab switching functionality
  const tabButtons = document.querySelectorAll('.tab-btn');
  const tabContents = document.querySelectorAll('.tab-content');
  
  tabButtons.forEach(button => {
    button.addEventListener('click', function() {
      const targetTab = this.getAttribute('data-tab');
      
      // Remove active class from all tabs and contents
      tabButtons.forEach(btn => btn.classList.remove('active'));
      tabContents.forEach(content => content.classList.remove('active'));
      
      // Add active class to clicked tab and target content
      this.classList.add('active');
      document.getElementById(targetTab).classList.add('active');
    });
  });

  // Event item interactions
  const eventItems = document.querySelectorAll('.event-item');
  eventItems.forEach(item => {
    item.addEventListener('click', function() {
      const eventTitle = this.querySelector('h3').textContent;
      const eventDescription = this.querySelector('p').textContent;
      const eventDate = this.querySelector('.event-date').textContent;
      
      showEventDetails(eventTitle, eventDescription, eventDate);
    });
  });

  // Event details modal
  function showEventDetails(title, description, date) {
    const modal = document.createElement('div');
    modal.className = 'event-modal';
    modal.innerHTML = `
      <div class="event-modal-content">
        <div class="event-modal-header">
          <h3>${title}</h3>
          <button class="close-btn">&times;</button>
        </div>
        <div class="event-modal-body">
          <div class="event-info">
            <p><strong>Description:</strong> ${description}</p>
            <p><strong>Date:</strong> ${date}</p>
            <p><strong>Location:</strong> Various locations across Europe and India</p>
          </div>
          <div class="event-actions">
            <button class="action-btn primary">Register for Event</button>
            <button class="action-btn secondary">Learn More</button>
          </div>
        </div>
      </div>
    `;
    
    modal.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(0,0,0,0.8);
      display: flex;
      justify-content: center;
      align-items: center;
      z-index: 10000;
      animation: fadeIn 0.3s ease;
    `;
    
    modal.querySelector('.event-modal-content').style.cssText = `
      background: white;
      border-radius: 12px;
      max-width: 500px;
      width: 90%;
      animation: slideIn 0.3s ease;
    `;
    
    modal.querySelector('.event-modal-header').style.cssText = `
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 1.5rem;
      border-bottom: 1px solid #eee;
    `;
    
    modal.querySelector('.event-modal-body').style.cssText = `
      padding: 1.5rem;
    `;
    
    modal.querySelector('.close-btn').style.cssText = `
      background: none;
      border: none;
      font-size: 1.5rem;
      cursor: pointer;
      color: #666;
    `;
    
    modal.querySelector('.event-actions').style.cssText = `
      display: flex;
      gap: 1rem;
      margin-top: 1.5rem;
    `;
    
    modal.querySelector('.action-btn').style.cssText = `
      padding: 0.8rem 1.5rem;
      border: none;
      border-radius: 6px;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.3s ease;
    `;
    
    modal.querySelector('.action-btn.primary').style.cssText = `
      background: var(--primary);
      color: white;
    `;
    
    modal.querySelector('.action-btn.secondary').style.cssText = `
      background: #f8f9fa;
      color: #333;
      border: 2px solid #e9ecef;
    `;
    
    document.body.appendChild(modal);
    
    // Close functionality
    modal.querySelector('.close-btn').addEventListener('click', () => {
      modal.remove();
    });
    
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        modal.remove();
      }
    });
    
    // Action button functionality
    modal.querySelector('.action-btn.primary').addEventListener('click', () => {
      alert('Registration functionality will be implemented here.');
    });
    
    modal.querySelector('.action-btn.secondary').addEventListener('click', () => {
      alert('More information about this event will be displayed here.');
    });
  }

  // Banner button functionality
  const bannerBtn = document.querySelector('.banner-btn');
  if (bannerBtn) {
    bannerBtn.addEventListener('click', function() {
      showBannerDetails();
    });
  }

  function showBannerDetails() {
    const modal = document.createElement('div');
    modal.className = 'banner-modal';
    modal.innerHTML = `
      <div class="banner-modal-content">
        <div class="banner-modal-header">
          <h3>WTE Miami 2025</h3>
          <button class="close-btn">&times;</button>
        </div>
        <div class="banner-modal-body">
          <div class="banner-info">
            <h4>U.S. & INTERNATIONAL TRAVEL MARKET</h4>
            <p>Join us at WTE Miami 2025, the premier travel trade show connecting the Americas with the world.</p>
            <ul>
              <li>Meet DMCs, tourism boards, hotels, airlines, cruise lines, attractions & more</li>
              <li>Network with industry leaders from around the globe</li>
              <li>Discover new destinations and travel products</li>
              <li>Attend educational sessions and workshops</li>
            </ul>
            <div class="banner-details">
              <p><strong>Date:</strong> March 2025</p>
              <p><strong>Location:</strong> Miami, Florida, USA</p>
              <p><strong>Venue:</strong> Miami Beach Convention Center</p>
            </div>
          </div>
          <div class="banner-actions">
            <button class="action-btn primary">Register Now</button>
            <button class="action-btn secondary">Download Brochure</button>
          </div>
        </div>
      </div>
    `;
    
    modal.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(0,0,0,0.8);
      display: flex;
      justify-content: center;
      align-items: center;
      z-index: 10000;
      animation: fadeIn 0.3s ease;
    `;
    
    modal.querySelector('.banner-modal-content').style.cssText = `
      background: white;
      border-radius: 12px;
      max-width: 600px;
      width: 90%;
      max-height: 80vh;
      overflow-y: auto;
      animation: slideIn 0.3s ease;
    `;
    
    modal.querySelector('.banner-modal-header').style.cssText = `
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 1.5rem;
      border-bottom: 1px solid #eee;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      border-radius: 12px 12px 0 0;
    `;
    
    modal.querySelector('.banner-modal-body').style.cssText = `
      padding: 1.5rem;
    `;
    
    modal.querySelector('.banner-info ul').style.cssText = `
      margin: 1rem 0;
      padding-left: 1.5rem;
    `;
    
    modal.querySelector('.banner-info li').style.cssText = `
      margin-bottom: 0.5rem;
      line-height: 1.5;
    `;
    
    modal.querySelector('.banner-details').style.cssText = `
      background: #f8f9fa;
      padding: 1rem;
      border-radius: 8px;
      margin: 1rem 0;
    `;
    
    modal.querySelector('.banner-actions').style.cssText = `
      display: flex;
      gap: 1rem;
      margin-top: 1.5rem;
    `;
    
    modal.querySelector('.action-btn').style.cssText = `
      padding: 0.8rem 1.5rem;
      border: none;
      border-radius: 6px;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.3s ease;
    `;
    
    modal.querySelector('.action-btn.primary').style.cssText = `
      background: var(--primary);
      color: white;
    `;
    
    modal.querySelector('.action-btn.secondary').style.cssText = `
      background: #f8f9fa;
      color: #333;
      border: 2px solid #e9ecef;
    `;
    
    document.body.appendChild(modal);
    
    // Close functionality
    modal.querySelector('.close-btn').addEventListener('click', () => {
      modal.remove();
    });
    
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        modal.remove();
      }
    });
    
    // Action button functionality
    modal.querySelector('.action-btn.primary').addEventListener('click', () => {
      alert('Registration for WTE Miami 2025 will be available soon.');
    });
    
    modal.querySelector('.action-btn.secondary').addEventListener('click', () => {
      alert('Event brochure will be available for download soon.');
    });
  }

  // Partner logo interactions
  const logoItems = document.querySelectorAll('.logo-item');
  logoItems.forEach(item => {
    item.addEventListener('click', function() {
      const logoAlt = this.querySelector('img').alt;
      showPartnerInfo(logoAlt);
    });
  });

  function showPartnerInfo(partnerName) {
    const partnerInfo = {
      'ANUGA': 'World\'s leading trade fair for food and beverages',
      'COP24 Katowice 2018': 'United Nations Climate Change Conference',
      'Eurosatory Paris': 'International defense and security exhibition',
      'Festival de Cannes': 'International film festival',
      'Fitur': 'International Tourism Trade Fair',
      'Gulfood': 'Middle East\'s largest food & beverage trade show',
      'ITB Berlin': 'The World\'s Leading Travel Trade Show',
      'OECD': 'Organization for Economic Cooperation and Development',
      'Odykh Leisure': 'Leisure and tourism services',
      'Pravasi Bharatiya Divas': 'Indian diaspora celebration and conference',
      'G20 Turkey 2015': 'G20 Leaders Summit',
      'WTM London': 'World Travel Market London'
    };

    const info = partnerInfo[partnerName] || 'Partner information not available';
    
    const notification = document.createElement('div');
    notification.className = 'partner-notification';
    notification.innerHTML = `
      <div class="notification-content">
        <h4>${partnerName}</h4>
        <p>${info}</p>
        <button class="close-notification">&times;</button>
      </div>
    `;
    
    notification.style.cssText = `
      position: fixed;
      top: 20px;
      right: 20px;
      background: white;
      color: #333;
      padding: 1rem 1.5rem;
      border-radius: 8px;
      box-shadow: 0 4px 12px rgba(0,0,0,0.15);
      z-index: 10000;
      animation: slideInRight 0.3s ease;
      max-width: 300px;
    `;
    
    notification.querySelector('.notification-content h4').style.cssText = `
      margin: 0 0 0.5rem 0;
      color: var(--primary);
      font-size: 1.1rem;
    `;
    
    notification.querySelector('.notification-content p').style.cssText = `
      margin: 0 0 1rem 0;
      line-height: 1.4;
    `;
    
    notification.querySelector('.close-notification').style.cssText = `
      background: none;
      border: none;
      font-size: 1.2rem;
      cursor: pointer;
      color: #666;
      position: absolute;
      top: 0.5rem;
      right: 0.5rem;
    `;
    
    document.body.appendChild(notification);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
      if (notification.parentNode) {
        notification.remove();
      }
    }, 5000);
    
    // Close button functionality
    notification.querySelector('.close-notification').addEventListener('click', () => {
      notification.remove();
    });
  }

})();

function subscribe(e){
  e.preventDefault();
  const email = e.target.querySelector('input[type="email"]').value;
  
  // Show success message
  showSuccessMessage('newsletter');
  
  // Clear form
  e.target.reset();
  
  return false;
}

function subscribeNewsletter(e) {
  e.preventDefault();
  const email = e.target.querySelector('input[type="email"]').value;
  
  // Show success message
  showSuccessMessage('newsletter');
  
  // Clear form
  e.target.reset();
  
  return false;
}

document.querySelectorAll('.view-all').forEach(a=>{
  a.addEventListener('click', (e)=>{
    e.preventDefault();
    window.scrollTo({top:0,behavior:'smooth'});
  });
});

// Smooth scrolling for all internal links
document.addEventListener('DOMContentLoaded', function() {
  // Smooth scroll for anchor links
  const links = document.querySelectorAll('a[href^="#"]');
  links.forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      const targetId = this.getAttribute('href');
      const targetElement = document.querySelector(targetId);
      
      if (targetElement) {
        targetElement.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });

  // Enhanced magazine slider functionality
  let currentMagazineIndex = 0;
  const magazineSlides = document.querySelectorAll('.magazine-slide');
  const magazineDots = document.querySelectorAll('.magazine-dot');
  
  function showMagazine(index) {
    // Hide all slides
    magazineSlides.forEach(slide => slide.classList.remove('active'));
    magazineDots.forEach(dot => dot.classList.remove('active'));
    
    // Show current slide
    if (magazineSlides[index]) {
      magazineSlides[index].classList.add('active');
    }
    if (magazineDots[index]) {
      magazineDots[index].classList.add('active');
    }
    
    currentMagazineIndex = index;
  }
  
  // Magazine navigation functions
  window.changeMagazine = function(direction) {
    let newIndex = currentMagazineIndex + direction;
    
    if (newIndex >= magazineSlides.length) {
      newIndex = 0;
    } else if (newIndex < 0) {
      newIndex = magazineSlides.length - 1;
    }
    
    showMagazine(newIndex);
  };
  
  window.currentMagazine = function(index) {
    showMagazine(index - 1);
  };
  
  // Auto-advance magazine slider
  setInterval(() => {
    changeMagazine(1);
  }, 5000);
  
  // Enhanced search functionality
  const searchInputs = document.querySelectorAll('.search-input');
  searchInputs.forEach(input => {
    input.addEventListener('input', function() {
      const query = this.value.toLowerCase();
      const cards = document.querySelectorAll('.card');
      
      cards.forEach(card => {
        const title = card.querySelector('.title')?.textContent.toLowerCase() || '';
        const excerpt = card.querySelector('.excerpt')?.textContent.toLowerCase() || '';
        const kicker = card.querySelector('.kicker')?.textContent.toLowerCase() || '';
        
        if (title.includes(query) || excerpt.includes(query) || kicker.includes(query)) {
          card.style.display = 'block';
          card.style.opacity = '1';
        } else {
          card.style.opacity = '0.3';
        }
      });
    });
    
    // Clear search
    input.addEventListener('blur', function() {
      if (this.value === '') {
        const cards = document.querySelectorAll('.card');
        cards.forEach(card => {
          card.style.opacity = '1';
        });
      }
    });
  });
  
  // Lazy loading for images
  const images = document.querySelectorAll('img[data-src]');
  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src;
        img.classList.remove('lazy');
        imageObserver.unobserve(img);
      }
    });
  });
  
  images.forEach(img => imageObserver.observe(img));
  

  
  // Add scroll progress indicator
  const scrollProgress = document.createElement('div');
  scrollProgress.className = 'scroll-progress';
  document.body.appendChild(scrollProgress);
  
  window.addEventListener('scroll', () => {
    const scrollTop = window.pageYOffset;
    const docHeight = document.body.scrollHeight - window.innerHeight;
    const scrollPercent = (scrollTop / docHeight) * 100;
    scrollProgress.style.width = scrollPercent + '%';
  });
  
  // Enhanced card animations
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };
  
  const cardObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, observerOptions);
  
  const animatedCards = document.querySelectorAll('.card, .culture-card, .travel-card, .post-card');
  animatedCards.forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    cardObserver.observe(card);
  });
});



 // Keyboard focus outline only when using keyboard
 (function () {
  const body = document.body;
  function addKeys(e) { if (e.key === 'Tab') body.classList.add('using-kb'); }
  function removeMouse() { body.classList.remove('using-kb'); }
  window.addEventListener('keydown', addKeys);
  window.addEventListener('mousedown', removeMouse);
})();
function openNewsletter() {
document.getElementById("newsletterPopup").style.display = "flex";
}
// Auto-show popup after 2s
window.addEventListener("load", function () {
setTimeout(() => {
  document.getElementById("migNewsletterOverlay").style.display = "flex";
}, 500);
});
// Close popup
function closeMigNewsletter() {
document.getElementById("migNewsletterOverlay").style.display = "none";
}
// Submit newsletter
function submitMigNewsletter(event) {
event.preventDefault();
// Hide newsletter popup
document.getElementById("migNewsletterOverlay").style.display = "none";
// Show success modal
const successModal = document.getElementById("migSuccessModal");
successModal.style.display = "flex";
// Auto-close after 4s
setTimeout(() => {
  successModal.style.display = "none";
}, 500);
return false;
}
