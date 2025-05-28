// Configuration
const config = {
    mobileBreakpoint: 768,
    animationDuration: 300,
    scrollOffset: 100
};

// DOM Elements
const elements = {
    navbar: document.querySelector('.navbar'),
    navLinks: document.querySelector('.nav-links'),
    burger: document.querySelector('.burger'),
    sections: document.querySelectorAll('section'),
    scrollTopBtn: document.querySelector('.scroll-top')
};

// State Management
const state = {
    isMenuOpen: false,
    lastScrollY: 0,
    isScrolling: false
};

// Utility Functions
const utils = {
    debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    },

    throttle(func, limit) {
        let inThrottle;
        return function executedFunction(...args) {
            if (!inThrottle) {
                func(...args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    },

    isMobile() {
        return window.innerWidth <= config.mobileBreakpoint;
    }
};

// Navigation Functions
const navigation = {
    toggleMenu() {
        state.isMenuOpen = !state.isMenuOpen;
        elements.navLinks.classList.toggle('active');
        elements.burger.classList.toggle('active');
    },

    closeMenu() {
        if (state.isMenuOpen) {
            navigation.toggleMenu();
        }
    },

    handleScroll() {
        const currentScrollY = window.scrollY;
        
        // Navbar background
        if (currentScrollY > 50) {
            elements.navbar.classList.add('scrolled');
        } else {
            elements.navbar.classList.remove('scrolled');
        }

        // Close menu on scroll
        if (state.isMenuOpen && currentScrollY > 100) {
            navigation.closeMenu();
        }

        // Scroll to top button
        if (currentScrollY > 500) {
            elements.scrollTopBtn?.classList.add('visible');
        } else {
            elements.scrollTopBtn?.classList.remove('visible');
        }

        state.lastScrollY = currentScrollY;
    },

    handleResize() {
        if (window.innerWidth > config.mobileBreakpoint && state.isMenuOpen) {
            navigation.closeMenu();
        }
    }
};

// Animation Functions
const animations = {
    fadeIn(element) {
        element.style.opacity = '0';
        element.style.display = 'block';
        
        setTimeout(() => {
            element.style.transition = `opacity ${config.animationDuration}ms ease`;
            element.style.opacity = '1';
        }, 10);
    },

    fadeOut(element) {
        element.style.transition = `opacity ${config.animationDuration}ms ease`;
        element.style.opacity = '0';
        
        setTimeout(() => {
            element.style.display = 'none';
        }, config.animationDuration);
    },

    scrollToSection(event) {
        event.preventDefault();
        const targetId = event.currentTarget.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        
        if (targetSection) {
            const offsetTop = targetSection.offsetTop - config.scrollOffset;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
            navigation.closeMenu();
        }
    }
};

// Form Handling
const forms = {
    handleSubmit(event) {
        event.preventDefault();
        const form = event.target;
        const formData = new FormData(form);
        
        // Add your form submission logic here
        console.log('Form submitted:', Object.fromEntries(formData));
        
        // Reset form
        form.reset();
    },

    validateInput(input) {
        const value = input.value.trim();
        let isValid = true;
        let errorMessage = '';

        switch(input.type) {
            case 'email':
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                isValid = emailRegex.test(value);
                errorMessage = 'Please enter a valid email address';
                break;
            case 'tel':
                const phoneRegex = /^\+?[\d\s-]{10,}$/;
                isValid = phoneRegex.test(value);
                errorMessage = 'Please enter a valid phone number';
                break;
            default:
                isValid = value.length > 0;
                errorMessage = 'This field is required';
        }

        if (!isValid) {
            input.classList.add('error');
            input.setCustomValidity(errorMessage);
        } else {
            input.classList.remove('error');
            input.setCustomValidity('');
        }

        return isValid;
    }
};

// Certifications Section Animations
const certifications = {
    init() {
        this.certificationItems = document.querySelectorAll('.certification-item');
        this.setupIntersectionObserver();
        this.setupHoverEffects();
    },

    setupIntersectionObserver() {
        const options = {
            threshold: 0.2,
            rootMargin: '0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    observer.unobserve(entry.target);
                }
            });
        }, options);

        this.certificationItems.forEach(item => {
            observer.observe(item);
        });
    },

    setupHoverEffects() {
        this.certificationItems.forEach(item => {
            item.addEventListener('mouseenter', () => {
                this.animateItem(item, true);
            });

            item.addEventListener('mouseleave', () => {
                this.animateItem(item, false);
            });
        });
    },

    animateItem(item, isEntering) {
        const icon = item.querySelector('.certification-icon');
        const content = item.querySelector('.certification-content');
        
        if (isEntering) {
            icon.style.transform = 'scale(1.1)';
            content.style.transform = 'translateY(-5px)';
        } else {
            icon.style.transform = 'scale(1)';
            content.style.transform = 'translateY(0)';
        }
    }
};

// Event Listeners
const initEventListeners = () => {
    // Navigation
    elements.burger?.addEventListener('click', navigation.toggleMenu);

    elements.navLinks?.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - config.scrollOffset;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
                navigation.closeMenu();
            }
        });
    });

    // Close menu when clicking outside
    document.addEventListener('click', (event) => {
        if (state.isMenuOpen && 
            !elements.navLinks.contains(event.target) && 
            !elements.burger.contains(event.target)) {
            navigation.closeMenu();
        }
    });

    // Close menu on escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && state.isMenuOpen) {
            navigation.closeMenu();
        }
    });

    // Scroll
    window.addEventListener('scroll', utils.throttle(navigation.handleScroll, 100));
    
    // Resize
    window.addEventListener('resize', utils.debounce(navigation.handleResize, 250));

    // Forms
    document.querySelectorAll('form').forEach(form => {
        form.addEventListener('submit', forms.handleSubmit);
        form.querySelectorAll('input, textarea').forEach(input => {
            input.addEventListener('blur', () => forms.validateInput(input));
            input.addEventListener('input', () => forms.validateInput(input));
        });
    });

    // Scroll to top
    elements.scrollTopBtn?.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
};

// Initialize
const init = () => {
    initEventListeners();
    navigation.handleScroll(); // Initial check for scroll position
    certifications.init();
};

// Start the application
document.addEventListener('DOMContentLoaded', init); 