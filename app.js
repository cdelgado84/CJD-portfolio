/**
 * Portfolio Website - Main JavaScript
 * Author: Christian Delgado
 * Features: Theme toggle, language switching, smooth scroll, animations, form handling
 */

// ====================================
// Global State Management
// ====================================
const state = {
    currentLanguage: localStorage.getItem('language') || 'en',
    currentTheme: localStorage.getItem('theme') || 'light',
    isMenuOpen: false
};

// ====================================
// Theme Management
// ====================================
const themeToggle = {
    button: null,

    init() {
        this.button = document.querySelector('.theme-toggle');
        if (!this.button) return;

        // Set initial theme
        this.setTheme(state.currentTheme);

        // Add event listener
        this.button.addEventListener('click', () => this.toggleTheme());
    },

    setTheme(theme) {
        state.currentTheme = theme;
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
    },

    toggleTheme() {
        const newTheme = state.currentTheme === 'light' ? 'dark' : 'light';
        this.setTheme(newTheme);
    }
};

// ====================================
// Language Management
// ====================================
const languageToggle = {
    button: null,
    translations: null,

    init() {
        this.button = document.querySelector('.lang-toggle');
        if (!this.button) return;

        // Set initial language
        this.setLanguage(state.currentLanguage);

        // Add event listener
        this.button.addEventListener('click', () => this.toggleLanguage());
    },

    setLanguage(lang) {
        state.currentLanguage = lang;
        localStorage.setItem('language', lang);

        // Update button text
        const langText = this.button.querySelector('.lang-text');
        if (langText) {
            langText.textContent = lang.toUpperCase();
        }

        // Update all text elements with data attributes
        this.updateTextContent(lang);

        // Update HTML lang attribute
        document.documentElement.setAttribute('lang', lang);
    },

    toggleLanguage() {
        const newLang = state.currentLanguage === 'en' ? 'es' : 'en';
        this.setLanguage(newLang);
    },

    updateTextContent(lang) {
        const elements = document.querySelectorAll('[data-en][data-es]');
        elements.forEach(element => {
            const text = element.getAttribute(`data-${lang}`);
            if (text) {
                // Check if element is an input or textarea
                if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
                    element.placeholder = text;
                } else {
                    element.textContent = text;
                }
            }
        });
    }
};

// ====================================
// Navigation Management
// ====================================
const navigation = {
    navbar: null,
    mobileToggle: null,
    navMenu: null,
    navLinks: null,
    scrollThreshold: 50,

    init() {
        this.navbar = document.getElementById('navbar');
        this.mobileToggle = document.querySelector('.mobile-menu-toggle');
        this.navMenu = document.querySelector('.nav-menu');
        this.navLinks = document.querySelectorAll('.nav-link');

        if (!this.navbar) return;

        // Add scroll event listener
        window.addEventListener('scroll', () => this.handleScroll());

        // Mobile menu toggle
        if (this.mobileToggle) {
            this.mobileToggle.addEventListener('click', () => this.toggleMobileMenu());
        }

        // Close mobile menu when clicking on a link
        this.navLinks.forEach(link => {
            link.addEventListener('click', () => {
                if (state.isMenuOpen) {
                    this.toggleMobileMenu();
                }
            });
        });

        // Handle active link on scroll
        this.handleActiveLink();
        window.addEventListener('scroll', () => this.handleActiveLink());
    },

    handleScroll() {
        if (window.scrollY > this.scrollThreshold) {
            this.navbar.classList.add('scrolled');
        } else {
            this.navbar.classList.remove('scrolled');
        }
    },

    toggleMobileMenu() {
        state.isMenuOpen = !state.isMenuOpen;
        this.navMenu.classList.toggle('active');
        this.mobileToggle.setAttribute('aria-expanded', state.isMenuOpen);

        // Animate hamburger icon
        const spans = this.mobileToggle.querySelectorAll('span');
        if (state.isMenuOpen) {
            spans[0].style.transform = 'rotate(45deg) translateY(10px)';
            spans[1].style.opacity = '0';
            spans[2].style.transform = 'rotate(-45deg) translateY(-10px)';
        } else {
            spans[0].style.transform = '';
            spans[1].style.opacity = '';
            spans[2].style.transform = '';
        }
    },

    handleActiveLink() {
        const sections = document.querySelectorAll('section[id]');
        const scrollPosition = window.scrollY + 100;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');

            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                this.navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }
};

// ====================================
// Smooth Scroll
// ====================================
const smoothScroll = {
    init() {
        const links = document.querySelectorAll('a[href^="#"]');

        links.forEach(link => {
            link.addEventListener('click', (e) => {
                const href = link.getAttribute('href');

                // Skip if href is just "#"
                if (href === '#') return;

                const target = document.querySelector(href);

                if (target) {
                    e.preventDefault();
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });
    }
};

// ====================================
// Scroll Animations
// ====================================
const scrollAnimations = {
    observer: null,

    init() {
        // Check if IntersectionObserver is supported
        if (!('IntersectionObserver' in window)) return;

        const options = {
            threshold: 0.15,
            rootMargin: '0px 0px -80px 0px'
        };

        this.observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateX(0) translateY(0)';

                    // Add a slight delay based on element index for stagger effect
                    const delay = entry.target.dataset.animationDelay || 0;
                    entry.target.style.transitionDelay = `${delay}ms`;
                }
            });
        }, options);

        // Animate timeline items with alternating directions
        const timelineItems = document.querySelectorAll('.timeline-item');
        timelineItems.forEach((el, index) => {
            // Determine if item is on left or right (odd/even)
            const isOdd = (index + 1) % 2 === 1;
            const translateX = window.innerWidth > 968 ? (isOdd ? '-50px' : '50px') : '0';

            // Set initial state
            el.style.opacity = '0';
            el.style.transform = `translateX(${translateX}) translateY(30px)`;
            el.style.transition = 'opacity 0.7s ease-out, transform 0.7s ease-out';
            el.dataset.animationDelay = index * 100;

            this.observer.observe(el);
        });

        // Animate project cards
        const projectCards = document.querySelectorAll('.project-card');
        projectCards.forEach((el, index) => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(40px)';
            el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
            el.dataset.animationDelay = index * 100;

            this.observer.observe(el);
        });

        // Animate skill categories
        const skillCategories = document.querySelectorAll('.skill-category');
        skillCategories.forEach((el, index) => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(30px)';
            el.style.transition = 'opacity 0.5s ease-out, transform 0.5s ease-out';
            el.dataset.animationDelay = index * 80;

            this.observer.observe(el);
        });

        // Animate about section elements
        const aboutPhoto = document.querySelector('.about-photo');
        const aboutText = document.querySelector('.about-text');

        if (aboutPhoto) {
            aboutPhoto.style.opacity = '0';
            aboutPhoto.style.transform = 'translateX(-30px)';
            aboutPhoto.style.transition = 'opacity 0.8s ease-out, transform 0.8s ease-out';
            this.observer.observe(aboutPhoto);
        }

        if (aboutText) {
            aboutText.style.opacity = '0';
            aboutText.style.transform = 'translateX(30px)';
            aboutText.style.transition = 'opacity 0.8s ease-out 0.2s, transform 0.8s ease-out 0.2s';
            this.observer.observe(aboutText);
        }
    }
};

// ====================================
// Contact Form
// ====================================
const contactForm = {
    form: null,
    statusElement: null,

    init() {
        this.form = document.getElementById('contactForm');
        this.statusElement = document.getElementById('formStatus');

        if (!this.form) return;

        this.form.addEventListener('submit', (e) => this.handleSubmit(e));
    },

    async handleSubmit(e) {
        e.preventDefault();

        const formData = {
            name: this.form.name.value,
            email: this.form.email.value,
            message: this.form.message.value
        };

        // Basic validation
        if (!this.validateForm(formData)) {
            this.showStatus('error', state.currentLanguage === 'en'
                ? 'Please fill in all fields correctly.'
                : 'Por favor complete todos los campos correctamente.');
            return;
        }

        // Show loading state
        const submitButton = this.form.querySelector('button[type="submit"]');
        const originalButtonText = submitButton.textContent;
        submitButton.disabled = true;
        submitButton.textContent = state.currentLanguage === 'en' ? 'Sending...' : 'Enviando...';

        // Simulate form submission (replace with actual API call)
        try {
            await this.simulateSubmit(formData);

            this.showStatus('success', state.currentLanguage === 'en'
                ? 'Thank you! Your message has been sent successfully.'
                : '¡Gracias! Tu mensaje ha sido enviado exitosamente.');

            this.form.reset();
        } catch (error) {
            this.showStatus('error', state.currentLanguage === 'en'
                ? 'Oops! Something went wrong. Please try again.'
                : '¡Ups! Algo salió mal. Por favor intenta de nuevo.');
        } finally {
            submitButton.disabled = false;
            submitButton.textContent = originalButtonText;
        }
    },

    validateForm(data) {
        // Name validation
        if (!data.name || data.name.trim().length < 2) {
            return false;
        }

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(data.email)) {
            return false;
        }

        // Message validation
        if (!data.message || data.message.trim().length < 10) {
            return false;
        }

        return true;
    },

    simulateSubmit(data) {
        // This simulates an API call - replace with actual submission logic
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                console.log('Form submitted:', data);
                // Randomly succeed or fail for demo purposes
                // In production, this would be an actual API call
                resolve();
            }, 1500);
        });
    },

    showStatus(type, message) {
        if (!this.statusElement) return;

        this.statusElement.textContent = message;
        this.statusElement.className = `form-status ${type}`;

        // Auto-hide after 5 seconds
        setTimeout(() => {
            this.statusElement.className = 'form-status';
        }, 5000);
    }
};

// ====================================
// Scroll Indicator
// ====================================
const scrollIndicator = {
    init() {
        const indicator = document.querySelector('.scroll-indicator');
        if (!indicator) return;

        // Hide indicator after scrolling
        window.addEventListener('scroll', () => {
            if (window.scrollY > 200) {
                indicator.style.opacity = '0';
                indicator.style.pointerEvents = 'none';
            } else {
                indicator.style.opacity = '1';
                indicator.style.pointerEvents = 'auto';
            }
        });
    }
};

// ====================================
// Performance Optimization
// ====================================
const performance = {
    init() {
        // Debounce scroll events
        this.debounce = (func, wait) => {
            let timeout;
            return function executedFunction(...args) {
                const later = () => {
                    clearTimeout(timeout);
                    func(...args);
                };
                clearTimeout(timeout);
                timeout = setTimeout(later, wait);
            };
        };

        // Lazy load images if needed
        this.lazyLoadImages();
    },

    lazyLoadImages() {
        if ('loading' in HTMLImageElement.prototype) {
            const images = document.querySelectorAll('img[loading="lazy"]');
            images.forEach(img => {
                img.src = img.dataset.src;
            });
        } else {
            // Fallback for browsers that don't support lazy loading
            const script = document.createElement('script');
            script.src = 'https://cdnjs.cloudflare.com/ajax/libs/lazysizes/5.3.2/lazysizes.min.js';
            document.body.appendChild(script);
        }
    }
};

// ====================================
// Accessibility Enhancements
// ====================================
const accessibility = {
    init() {
        // Add keyboard navigation for custom elements
        this.handleKeyboardNavigation();

        // Add focus visible styles
        this.handleFocusVisible();
    },

    handleKeyboardNavigation() {
        // Allow Enter key to trigger button clicks
        const customButtons = document.querySelectorAll('[role="button"]:not(button)');
        customButtons.forEach(button => {
            button.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    button.click();
                }
            });
        });
    },

    handleFocusVisible() {
        // Add focus-visible polyfill behavior
        document.addEventListener('mousedown', () => {
            document.body.classList.add('using-mouse');
        });

        document.addEventListener('keydown', (e) => {
            if (e.key === 'Tab') {
                document.body.classList.remove('using-mouse');
            }
        });
    }
};

// ====================================
// Analytics & Tracking (Optional)
// ====================================
const analytics = {
    init() {
        // Track external link clicks
        this.trackExternalLinks();

        // Track CV downloads
        this.trackDownloads();
    },

    trackExternalLinks() {
        const externalLinks = document.querySelectorAll('a[target="_blank"]');
        externalLinks.forEach(link => {
            link.addEventListener('click', () => {
                console.log('External link clicked:', link.href);
                // Add your analytics tracking code here (e.g., Google Analytics)
            });
        });
    },

    trackDownloads() {
        const downloadLinks = document.querySelectorAll('a[download]');
        downloadLinks.forEach(link => {
            link.addEventListener('click', () => {
                console.log('Download initiated:', link.href);
                // Add your analytics tracking code here
            });
        });
    }
};

// ====================================
// Easter Eggs & Fun Features
// ====================================
const easterEggs = {
    init() {
        // Konami code easter egg
        this.konamiCode();
    },

    konamiCode() {
        const pattern = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
        let current = 0;

        document.addEventListener('keydown', (e) => {
            if (e.key === pattern[current]) {
                current++;
                if (current === pattern.length) {
                    this.activateEasterEgg();
                    current = 0;
                }
            } else {
                current = 0;
            }
        });
    },

    activateEasterEgg() {
        console.log('🎉 Easter egg activated!');
        document.body.style.animation = 'rainbow 2s linear infinite';

        // Add rainbow animation
        const style = document.createElement('style');
        style.textContent = `
            @keyframes rainbow {
                0% { filter: hue-rotate(0deg); }
                100% { filter: hue-rotate(360deg); }
            }
        `;
        document.head.appendChild(style);

        // Remove after 5 seconds
        setTimeout(() => {
            document.body.style.animation = '';
        }, 5000);
    }
};

// ====================================
// Initialization
// ====================================
const app = {
    init() {
        // Initialize all modules
        themeToggle.init();
        languageToggle.init();
        navigation.init();
        smoothScroll.init();
        scrollAnimations.init();
        contactForm.init();
        scrollIndicator.init();
        performance.init();
        accessibility.init();
        analytics.init();
        easterEggs.init();

        // Log initialization
        console.log('Portfolio website initialized successfully! 🚀');
        console.log('Current theme:', state.currentTheme);
        console.log('Current language:', state.currentLanguage);
    }
};

// ====================================
// Start Application
// ====================================
// Wait for DOM to be ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => app.init());
} else {
    app.init();
}

// Handle page visibility changes
document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
        console.log('Page is hidden');
    } else {
        console.log('Page is visible');
    }
});

// Handle online/offline status
window.addEventListener('online', () => {
    console.log('Connection restored');
});

window.addEventListener('offline', () => {
    console.log('Connection lost');
});

// Export for potential use in other scripts
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { app, state };
}
