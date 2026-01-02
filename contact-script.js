// FAQ Accordion - Simple and reliable implementation
document.addEventListener('DOMContentLoaded', function() {
    const faqItems = document.querySelectorAll('.faq-item');
    console.log('Initializing FAQ with', faqItems.length, 'items');
    
    faqItems.forEach((faqItem) => {
        const question = faqItem.querySelector('.faq-question');
        const answer = faqItem.querySelector('.faq-answer');
        
        if (!question || !answer) {
            console.error('FAQ item missing question or answer');
            return;
        }
        
        // Make question clickable
        question.style.cursor = 'pointer';
        
        // Add click event listener
        question.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            const isOpen = faqItem.classList.contains('active');
            
            // Close all other accordion items
            document.querySelectorAll('.faq-item.active').forEach((openItem) => {
                if (openItem !== faqItem) {
                    openItem.classList.remove('active');
                    const openAnswer = openItem.querySelector('.faq-answer');
                    if (openAnswer) {
                        openAnswer.style.maxHeight = null;
                    }
                }
            });
            
            // Toggle current item
            if (isOpen) {
                // Close this item
                faqItem.classList.remove('active');
                answer.style.maxHeight = null;
            } else {
                // Open this item
                faqItem.classList.add('active');
                answer.style.maxHeight = answer.scrollHeight + 'px';
            }
            
            console.log('FAQ toggled:', !isOpen);
        });
        
        // Set initial state
        answer.style.maxHeight = null;
    });
    
    // Handle window resize
    window.addEventListener('resize', function() {
        document.querySelectorAll('.faq-item.active').forEach((openItem) => {
            const answer = openItem.querySelector('.faq-answer');
            if (answer) {
                answer.style.maxHeight = answer.scrollHeight + 'px';
            }
        });
    });
});

// Form submission
document.getElementById('quickContactForm')?.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Get form data
    const formData = {
        name: document.getElementById('contactName').value,
        phone: document.getElementById('contactPhone').value,
        email: document.getElementById('contactEmail').value,
        subject: document.getElementById('contactSubject').value,
        education: document.getElementById('contactEducation').value,
        course: document.getElementById('contactCourse').value,
        message: document.getElementById('contactMessage').value,
        preferredMethods: Array.from(document.querySelectorAll('input[name="method"]:checked')).map(cb => cb.value),
        bestTime: document.getElementById('contactTime').value
    };

    // Validate phone number
    const phonePattern = /^[0-9]{10}$/;
    if (!phonePattern.test(formData.phone)) {
        alert('Please enter a valid 10-digit mobile number');
        return;
    }

    // Validate email
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(formData.email)) {
        alert('Please enter a valid email address');
        return;
    }

    // Validate at least one contact method selected
    if (formData.preferredMethods.length === 0) {
        alert('Please select at least one preferred contact method');
        return;
    }

    // Here you would typically send the data to your backend
    console.log('Form submitted:', formData);
    
    // Show success message
    alert('Thank you for reaching out! We will contact you within 24 hours as per your preference.');
    
    // Reset form
    this.reset();
});

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        if (href !== '#') {
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        }
    });
});

// Scroll to Top Button
const scrollTopBtn = document.getElementById('scrollTopBtn');

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        scrollTopBtn.classList.add('show');
    } else {
        scrollTopBtn.classList.remove('show');
    }
});

scrollTopBtn?.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Animate contact cards on scroll
const cardObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            cardObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.1 });

document.querySelectorAll('.contact-card, .social-card, .alt-contact-card, .office-info-box').forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = 'all 0.6s ease';
    cardObserver.observe(card);
});

// Animate timeline steps
const timelineObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateX(0)';
            }, index * 100);
            timelineObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.2 });

document.querySelectorAll('.timeline-step').forEach(step => {
    step.style.opacity = '0';
    step.style.transform = 'translateX(-50px)';
    step.style.transition = 'all 0.5s ease';
    timelineObserver.observe(step);
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
        if (scrolled < 500) {
            banner.style.transform = `translateY(${scrolled * 0.5}px)`;
        }
    }
});

// Form field validation in real-time
document.getElementById('contactPhone')?.addEventListener('input', function() {
    this.value = this.value.replace(/\D/g, '').substring(0, 10);
});

// Animate testimonial on scroll
const testimonialObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'scale(1)';
            testimonialObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.3 });

const testimonialBox = document.querySelector('.testimonial-box');
if (testimonialBox) {
    testimonialBox.style.opacity = '0';
    testimonialBox.style.transform = 'scale(0.9)';
    testimonialBox.style.transition = 'all 0.8s ease';
    testimonialObserver.observe(testimonialBox);
}

// Contact card hover effect enhancement
document.querySelectorAll('.contact-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.background = 'linear-gradient(135deg, #f5f7ff 0%, #f0f0ff 100%)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.background = 'white';
    });
});
