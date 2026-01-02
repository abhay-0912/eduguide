// FAQ Accordion
document.querySelectorAll('.faq-question').forEach(question => {
    question.addEventListener('click', function() {
        const faqItem = this.parentElement;
        
        // Close other FAQs
        document.querySelectorAll('.faq-item').forEach(item => {
            if (item !== faqItem) {
                item.classList.remove('active');
            }
        });
        
        // Toggle current FAQ
        faqItem.classList.toggle('active');
    });
});

// Animate numbers on scroll
const animateNumber = (element, target, duration = 2000) => {
    let start = 0;
    const increment = target / (duration / 16);
    const timer = setInterval(() => {
        start += increment;
        if (start >= target) {
            element.textContent = target;
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(start);
        }
    }, 16);
};

// Impact numbers animation
const impactObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const h3 = entry.target.querySelector('h3');
            const text = h3.textContent;
            const number = parseInt(text.replace(/\D/g, ''));
            
            if (number) {
                h3.textContent = '0';
                setTimeout(() => {
                    let current = 0;
                    const increment = number / 50;
                    const timer = setInterval(() => {
                        current += increment;
                        if (current >= number) {
                            h3.textContent = text;
                            clearInterval(timer);
                        } else {
                            h3.textContent = Math.floor(current) + text.replace(/\d+/g, '').trim();
                        }
                    }, 40);
                }, 200);
            }
            impactObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

document.querySelectorAll('.impact-card').forEach(card => {
    impactObserver.observe(card);
});

// Smooth reveal for sections
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, { threshold: 0.1 });

document.querySelectorAll('.service-card, .value-card, .partner-category').forEach(element => {
    element.style.opacity = '0';
    element.style.transform = 'translateY(30px)';
    element.style.transition = 'all 0.6s ease';
    revealObserver.observe(element);
});

// Process steps animation
const processObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateX(0)';
            }, index * 100);
            processObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.2 });

document.querySelectorAll('.process-step').forEach(step => {
    step.style.opacity = '0';
    step.style.transform = 'translateX(-50px)';
    step.style.transition = 'all 0.5s ease';
    processObserver.observe(step);
});

// Mobile menu functionality
const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
const navMenu = document.querySelector('.nav-menu');

mobileMenuToggle?.addEventListener('click', () => {
    navMenu.classList.toggle('active');
});

// Close mobile menu on link click
document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
    });
});

// Smooth scroll for internal links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
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

// Add loading animation
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s ease';
        document.body.style.opacity = '1';
    }, 100);
});

// Parallax effect for banner
window.addEventListener('scroll', () => {
    const banner = document.querySelector('.page-banner');
    if (banner) {
        const scrolled = window.pageYOffset;
        banner.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
});

// Sticky header background change
window.addEventListener('scroll', () => {
    const header = document.querySelector('.header');
    if (window.scrollY > 100) {
        header.style.background = 'rgba(255, 255, 255, 0.95)';
        header.style.backdropFilter = 'blur(10px)';
    } else {
        header.style.background = '#fff';
        header.style.backdropFilter = 'none';
    }
});
