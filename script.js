// Mobile Navigation
const burger = document.querySelector('.burger');
const nav = document.querySelector('.nav-links');
const navLinks = document.querySelectorAll('.nav-links li');
const body = document.body;

// Toggle mobile menu
function toggleMenu() {
    // Toggle Nav
    nav.classList.toggle('nav-active');
    
    // Toggle Burger Animation
    burger.classList.toggle('toggle');
    
    // Toggle Body Scroll
    body.style.overflow = nav.classList.contains('nav-active') ? 'hidden' : '';
    
    // Animate Links
    navLinks.forEach((link, index) => {
        if (link.style.animation) {
            link.style.animation = '';
        } else {
            link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.3}s`;
        }
    });
}

// Event Listeners
burger.addEventListener('click', toggleMenu);

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (nav.classList.contains('nav-active') && 
        !nav.contains(e.target) && 
        !burger.contains(e.target)) {
        toggleMenu();
    }
});

// Close mobile menu when clicking on a link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        if (nav.classList.contains('nav-active')) {
            toggleMenu();
        }
    });
});

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const headerOffset = 70;
            const elementPosition = target.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Form Submission
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(this);
        const data = Object.fromEntries(formData);
        
        // Here you would typically send the data to your server
        console.log('Form submitted:', data);
        
        // Show success message
        alert('Merci pour votre message. Nous vous contacterons bientôt!');
        
        // Reset form
        this.reset();
    });
}

// Scroll to Top Button
const scrollButton = document.createElement('button');
scrollButton.innerHTML = '<i class="fas fa-arrow-up"></i>';
scrollButton.className = 'scroll-button';
document.body.appendChild(scrollButton);

// Show/hide scroll button
window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        scrollButton.classList.add('show');
    } else {
        scrollButton.classList.remove('show');
    }
});

// Scroll to top when clicking the button
scrollButton.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Add styles for scroll button
const style = document.createElement('style');
style.textContent = `
    .scroll-button {
        position: fixed;
        bottom: 20px;
        right: 20px;
        background-color: var(--color4);
        color: white;
        width: 40px;
        height: 40px;
        border-radius: 50%;
        border: none;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s ease;
        z-index: 1000;
        box-shadow: 0 2px 5px rgba(0,0,0,0.2);
    }

    .scroll-button.show {
        opacity: 1;
        visibility: visible;
    }

    .scroll-button:hover {
        transform: translateY(-3px);
        box-shadow: 0 4px 8px rgba(0,0,0,0.3);
    }

    @keyframes navLinkFade {
        from {
            opacity: 0;
            transform: translateX(50px);
        }
        to {
            opacity: 1;
            transform: translateX(0);
        }
    }
`;
document.head.appendChild(style);

// Add responsive image handling
document.addEventListener('DOMContentLoaded', () => {
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        if (!img.hasAttribute('loading')) {
            img.setAttribute('loading', 'lazy');
        }
    });
});

// Add responsive font size adjustment
const adjustFontSize = () => {
    const vw = window.innerWidth;
    const baseSize = Math.max(16, Math.min(20, vw / 50));
    document.documentElement.style.fontSize = `${baseSize}px`;
};

window.addEventListener('resize', adjustFontSize);
adjustFontSize(); 