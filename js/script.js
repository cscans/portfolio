// Intersection Observer for scroll animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

// Create intersection observer
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate');
        }
    });
}, observerOptions);

// Function to observe elements
function observeElements() {
    // Observe section headers and subtitles
    document.querySelectorAll('.section-header, .section-subtitle').forEach(el => {
        observer.observe(el);
    });

    // Observe skill items with staggered delays
    document.querySelectorAll('.skill-item').forEach((el, index) => {
        el.classList.add(`animate-delay-${Math.min(index + 1, 6)}`);
        observer.observe(el);
    });

    // Observe project cards with staggered delays
    document.querySelectorAll('.project-card').forEach((el, index) => {
        el.classList.add(`animate-delay-${Math.min(index + 1, 6)}`);
        observer.observe(el);
    });

    // Observe about section elements
    document.querySelectorAll('.about-description').forEach(el => {
        observer.observe(el);
        
        // Also observe individual paragraphs with delays
        el.querySelectorAll('p').forEach((p, index) => {
            p.classList.add(`animate-delay-${index + 1}`);
            observer.observe(p);
        });
    });

    // Observe experience and education sections
    document.querySelectorAll('.experience-section, .education-section').forEach(el => {
        observer.observe(el);
        
        // Observe individual items with delays
        el.querySelectorAll('.experience-item, .education-item').forEach((item, index) => {
            item.classList.add(`animate-delay-${index + 1}`);
            observer.observe(item);
        });
    });

    // Observe contact form elements
    document.querySelectorAll('.contact-form').forEach(el => {
        observer.observe(el);
    });

    document.querySelectorAll('.form-group').forEach((el, index) => {
        el.classList.add(`animate-delay-${index + 1}`);
        observer.observe(el);
    });

    document.querySelectorAll('.submit-btn').forEach(el => {
        el.classList.add('animate-delay-6');
        observer.observe(el);
    });
}

// Image Gallery Modal Functions - Modified to read from HTML data attributes
let currentSlide = 0;
let imageCards = [];

// Initialize image cards array from HTML
function initializeImageCards() {
    imageCards = Array.from(document.querySelectorAll('.image-card[data-modal-title]')).map(card => ({
        title: card.getAttribute('data-modal-title'),
        subtitle: card.getAttribute('data-modal-subtitle'),
        image: card.getAttribute('data-modal-image'),
        alt: card.getAttribute('data-modal-alt') || card.getAttribute('data-modal-title')
    }));
}

function openModal(slideIndex) {
    currentSlide = slideIndex;
    const modal = document.getElementById('imageModal');
    if (modal && imageCards.length > 0) {
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden';
        updateModalContent();
    }
}

function closeModal() {
    const modal = document.getElementById('imageModal');
    if (modal) {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
}

function changeSlide(direction) {
    currentSlide += direction;
    if (currentSlide >= imageCards.length) {
        currentSlide = 0;
    } else if (currentSlide < 0) {
        currentSlide = imageCards.length - 1;
    }
    updateModalContent();
}

function updateModalContent() {
    const modalImageElement = document.getElementById('modalImageElement');
    const modalImagePlaceholder = document.getElementById('modalImagePlaceholder');
    const modalTitle = document.getElementById('modalTitle');
    
    if (modalImageElement && modalTitle && imageCards[currentSlide]) {
        const imageData = imageCards[currentSlide];
        
        // Update title
        modalTitle.innerHTML = `${imageData.title}<br><small>${imageData.subtitle}</small>`;
        
        // Try to load the actual image
        const img = new Image();
        img.onload = function() {
            // Image loaded successfully
            modalImageElement.src = imageData.image;
            modalImageElement.alt = imageData.alt;
            modalImageElement.style.display = 'block';
            modalImagePlaceholder.style.display = 'none';
        };
        img.onerror = function() {
            // Image failed to load, show placeholder
            modalImageElement.style.display = 'none';
            modalImagePlaceholder.style.display = 'flex';
            modalImagePlaceholder.textContent = imageData.title;
        };
        img.src = imageData.image;
    }
}

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Form submission handler
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(this);
        const data = Object.fromEntries(formData);
        
        // Simple validation
        if (!data.name || !data.email || !data.subject || !data.message) {
            alert('Please fill in all required fields.');
            return;
        }
        
        // Here you would typically send the data to a server
        // For now, we'll just show a success message
        alert('Thank you for your message! I will get back to you soon.');
        
        // Reset the form
        this.reset();
    });
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    observeElements();
    initializeImageCards(); // Initialize the image cards from HTML
});

// Navbar scroll direction functionality
let lastScrollY = 0;
let scrollThreshold = 10; // Minimum scroll distance to trigger change

document.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    const currentScrollY = window.scrollY;
    
    if (navbar) {
        // Background blur effect (existing functionality)
        if (currentScrollY > 100) {
            navbar.style.background = 'rgba(255, 255, 255, 0.45)';
        } else {
            navbar.style.background = 'rgba(255, 255, 255, 0.45)';
        }
        
        // Scroll direction detection with threshold
        if (Math.abs(currentScrollY - lastScrollY) > scrollThreshold) {
            if (currentScrollY > lastScrollY && currentScrollY > 40
            ) {
                // Scrolling down - hide navbar
                navbar.style.position = 'relative';
                navbar.style.transform = 'translateY(-100%)';
            } else if (currentScrollY < lastScrollY || currentScrollY <= 100) {
                // Scrolling up or at top - show navbar
                navbar.style.position = 'sticky';
                navbar.style.transform = 'translateY(0)';
            }
            lastScrollY = currentScrollY;
        }
    }
});

// Close modal when clicking outside of content
window.onclick = function(event) {
    const modal = document.getElementById('imageModal');
    if (modal && event.target === modal) {
        closeModal();
    }
}

// Keyboard navigation for modal
document.addEventListener('keydown', function(event) {
    const modal = document.getElementById('imageModal');
    if (modal && modal.style.display === 'block') {
        if (event.key === 'Escape') {
            closeModal();
        } else if (event.key === 'ArrowLeft') {
            changeSlide(-1);
        } else if (event.key === 'ArrowRight') {
            changeSlide(1);
        }
    }
});