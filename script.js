// Language switching functionality
let currentLanguage = 'en';

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    // Initialize Feather icons
    feather.replace();
    
    // Set up language switcher
    initializeLanguageSwitcher();
    
    // Set up slide menu
    initializeSlideMenu();
    
    // Load saved language preference
    loadLanguagePreference();
    
    // Apply initial language
    applyLanguage(currentLanguage);
});

// Initialize language switcher functionality
function initializeLanguageSwitcher() {
    const langBtn = document.getElementById('langBtn');
    const langDropdown = document.getElementById('langDropdown');
    
    if (langBtn && langDropdown) {
        // Toggle dropdown on button click
        langBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            langDropdown.classList.toggle('active');
        });
        
        // Close dropdown when clicking outside
        document.addEventListener('click', function(e) {
            if (!langBtn.contains(e.target) && !langDropdown.contains(e.target)) {
                langDropdown.classList.remove('active');
            }
        });
        
        // Close dropdown on escape key
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape') {
                langDropdown.classList.remove('active');
            }
        });
    }
}

// Switch language function
function switchLanguage(lang) {
    currentLanguage = lang;
    applyLanguage(lang);
    saveLanguagePreference(lang);
    
    // Close dropdown
    const langDropdown = document.getElementById('langDropdown');
    if (langDropdown) {
        langDropdown.classList.remove('active');
    }
    
    // Update current language display
    const currentLangElement = document.getElementById('currentLang');
    if (currentLangElement) {
        currentLangElement.textContent = lang.toUpperCase();
    }
    
    // Update page title
    updatePageTitle(lang);
}

// Apply language to all elements
function applyLanguage(lang) {
    const elements = document.querySelectorAll('[data-en][data-bg]');
    
    elements.forEach(element => {
        const text = element.getAttribute(`data-${lang}`);
        if (text) {
            element.textContent = text;
        }
    });
    
    // Update HTML lang attribute
    document.documentElement.lang = lang;
}

// Update page title
function updatePageTitle(lang) {
    const titleElement = document.querySelector('title[data-en][data-bg]');
    if (titleElement) {
        const newTitle = titleElement.getAttribute(`data-${lang}`);
        if (newTitle) {
            document.title = newTitle;
        }
    }
}

// Save language preference to localStorage
function saveLanguagePreference(lang) {
    try {
        localStorage.setItem('preferredLanguage', lang);
    } catch (error) {
        console.warn('Could not save language preference:', error);
    }
}

// Load language preference from localStorage
function loadLanguagePreference() {
    try {
        const savedLang = localStorage.getItem('preferredLanguage');
        if (savedLang && (savedLang === 'en' || savedLang === 'bg')) {
            currentLanguage = savedLang;
            
            // Update current language display
            const currentLangElement = document.getElementById('currentLang');
            if (currentLangElement) {
                currentLangElement.textContent = savedLang.toUpperCase();
            }
        }
    } catch (error) {
        console.warn('Could not load language preference:', error);
    }
}

// Smooth scrolling for anchor links
document.addEventListener('click', function(e) {
    const target = e.target.closest('a[href^="#"]');
    if (target) {
        e.preventDefault();
        const targetId = target.getAttribute('href').substring(1);
        const targetElement = document.getElementById(targetId);
        
        if (targetElement) {
            targetElement.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    }
});

// Enhanced accessibility features
document.addEventListener('keydown', function(e) {
    // Enable navigation with Enter key for buttons
    if (e.key === 'Enter' && e.target.classList.contains('nav-button')) {
        e.target.click();
    }
    
    // Enable keyboard navigation for language switcher
    if (e.key === 'Enter' && e.target.classList.contains('lang-btn')) {
        const langDropdown = document.getElementById('langDropdown');
        if (langDropdown) {
            langDropdown.classList.toggle('active');
        }
    }
});

// Animate elements on scroll (intersection observer)
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Apply scroll animation to cards and sections
document.addEventListener('DOMContentLoaded', function() {
    const animatedElements = document.querySelectorAll('.nav-button, .service-card, .team-member, .about-section');
    
    animatedElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(element);
    });
});

// Handle form submissions (if any forms are added later)
function handleFormSubmission(formElement) {
    formElement.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Add loading state
        const submitButton = formElement.querySelector('button[type="submit"]');
        if (submitButton) {
            const originalText = submitButton.textContent;
            submitButton.textContent = currentLanguage === 'bg' ? 'Изпращане...' : 'Sending...';
            submitButton.disabled = true;
            
            // Simulate form submission
            setTimeout(() => {
                submitButton.textContent = originalText;
                submitButton.disabled = false;
                
                // Show success message
                const message = currentLanguage === 'bg' ? 'Съобщението е изпратено успешно!' : 'Message sent successfully!';
                alert(message);
            }, 2000);
        }
    });
}

// Utility function to debounce resize events
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Handle window resize for responsive adjustments
const handleResize = debounce(function() {
    // Close language dropdown on resize
    const langDropdown = document.getElementById('langDropdown');
    if (langDropdown) {
        langDropdown.classList.remove('active');
    }
    
    // Re-initialize Feather icons if needed
    feather.replace();
}, 250);

window.addEventListener('resize', handleResize);

// Print styles consideration
window.addEventListener('beforeprint', function() {
    // Hide interactive elements when printing
    const interactiveElements = document.querySelectorAll('.lang-dropdown, .google-rating-btn');
    interactiveElements.forEach(element => {
        element.style.display = 'none';
    });
});

window.addEventListener('afterprint', function() {
    // Restore interactive elements after printing
    const interactiveElements = document.querySelectorAll('.lang-dropdown, .google-rating-btn');
    interactiveElements.forEach(element => {
        element.style.display = '';
    });
});

// Error handling for missing elements
function safeElementOperation(elementId, operation) {
    const element = document.getElementById(elementId);
    if (element && typeof operation === 'function') {
        try {
            operation(element);
        } catch (error) {
            console.warn(`Error operating on element ${elementId}:`, error);
        }
    }
}

// Initialize slide menu functionality
function initializeSlideMenu() {
    const menuBtn = document.getElementById('menuBtn');
    const closeMenuBtn = document.getElementById('closeMenuBtn');
    const slideMenu = document.getElementById('slideMenu');
    const menuOverlay = document.getElementById('menuOverlay');
    
    if (menuBtn && slideMenu && menuOverlay) {
        // Open menu
        menuBtn.addEventListener('click', function() {
            slideMenu.classList.add('active');
            menuOverlay.classList.add('active');
            document.body.style.overflow = 'hidden';
                        
            // Re-apply language to menu content
            applyLanguage(currentLanguage);
        });
        
        // Close menu
        function closeMenu() {
            slideMenu.classList.remove('active');
            menuOverlay.classList.remove('active');
            document.body.style.overflow = '';
        }
        
        if (closeMenuBtn) {
            closeMenuBtn.addEventListener('click', closeMenu);
        }
        
        // Close menu when clicking overlay
        menuOverlay.addEventListener('click', closeMenu);
        
        // Close menu on escape key
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && slideMenu.classList.contains('active')) {
                closeMenu();
            }
        });
        
       
        // Handle dropdown buttons
        const dropdownBtns = slideMenu.querySelectorAll('.menu-dropdown-btn');
        dropdownBtns.forEach(btn => {
            btn.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                
                const container = btn.closest('li');
                const submenu = container.querySelector('.submenu');
                
                if (submenu) {
                    // Toggle expanded state
                    btn.classList.toggle('expanded');
                    submenu.classList.toggle('expanded');
                }
            });
        });
        
        
        
        // Close menu when clicking submenu items (navigation)
        const submenuItems = slideMenu.querySelectorAll('.submenu-item');
        submenuItems.forEach(item => {
            item.addEventListener('click', function() {
                // Small delay to allow navigation to start
                setTimeout(closeMenu, 100);
            });
        });
        
        // Close menu when clicking menu links (navigation)
        const menuLinks = slideMenu.querySelectorAll('.menu-item-link, .menu-item:not(.menu-dropdown-btn)');
        menuLinks.forEach(link => {
            link.addEventListener('click', function() {
                // Small delay to allow navigation to start
                setTimeout(closeMenu, 100);
            });
        });
    }
    
}

// Export functions for potential external use
window.switchLanguage = switchLanguage;
window.currentLanguage = () => currentLanguage;