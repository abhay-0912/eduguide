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

// Scroll to form function
function scrollToForm() {
    const form = document.querySelector('.registration-section');
    if (form) {
        form.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}

// Active navigation on scroll
window.addEventListener('scroll', () => {
    let current = '';
    const sections = document.querySelectorAll('section[id]');
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });

    document.querySelectorAll('.nav-menu a').forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// Form validation and submission
document.getElementById('counsellingForm')?.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Get form data
    const formData = {
        fullName: document.getElementById('fullName').value,
        mobile: document.getElementById('mobile').value,
        email: document.getElementById('email').value,
        education: document.getElementById('education').value,
        course: document.getElementById('course').value,
        mode: document.getElementById('mode').value,
        city: document.getElementById('city').value,
        state: document.getElementById('state').value,
        message: document.getElementById('message').value
    };

    // Validate mobile number
    const mobilePattern = /^[0-9]{10}$/;
    if (!mobilePattern.test(formData.mobile)) {
        alert('Please enter a valid 10-digit mobile number');
        return;
    }

    // Validate email
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(formData.email)) {
        alert('Please enter a valid email address');
        return;
    }

    // Here you would typically send the data to your backend
    console.log('Form submitted:', formData);
    
    // Show success message
    alert('Thank you for your interest! Our counsellor will contact you within 24 hours.');
    
    // Reset form
    this.reset();
});

// Mobile menu toggle
const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
const navMenu = document.querySelector('.nav-menu');

mobileMenuToggle?.addEventListener('click', () => {
    navMenu?.classList.toggle('active');
});

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (!e.target.closest('.header') && navMenu?.classList.contains('active')) {
        navMenu.classList.remove('active');
    }
});

// Close mobile menu when link is clicked
document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('click', () => {
        navMenu?.classList.remove('active');
    });
});

// Animate stats on scroll
const observerOptions = {
    threshold: 0.5,
    rootMargin: '0px'
};

const animateStats = (entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const statCards = entry.target.querySelectorAll('.stat-card h3');
            statCards.forEach(stat => {
                const finalValue = stat.textContent;
                const numMatch = finalValue.match(/\d+/);
                if (numMatch) {
                    const num = parseInt(numMatch[0]);
                    let current = 0;
                    const increment = num / 50;
                    const timer = setInterval(() => {
                        current += increment;
                        if (current >= num) {
                            stat.textContent = finalValue;
                            clearInterval(timer);
                        } else {
                            stat.textContent = Math.floor(current) + (finalValue.includes('+') ? '+' : '');
                        }
                    }, 30);
                }
            });
            observer.unobserve(entry.target);
        }
    });
};

const statsObserver = new IntersectionObserver(animateStats, observerOptions);
const statsSection = document.querySelector('.stats-section');
if (statsSection) {
    statsObserver.observe(statsSection);
}

// Add animation to cards on scroll
const cardObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '0';
            entry.target.style.transform = 'translateY(20px)';
            setTimeout(() => {
                entry.target.style.transition = 'all 0.5s ease';
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }, 100);
            cardObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.1 });

document.querySelectorAll('.course-card, .feature-card, .testimonial-card').forEach(card => {
    cardObserver.observe(card);
});

// Sticky header background change on scroll
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

// Smooth reveal animation for cards only (not full sections)
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
        }
    });
}, { threshold: 0.15 });

// Only animate specific elements, not entire sections
document.querySelectorAll('.course-card, .feature-card, .stat-card').forEach(element => {
    element.style.opacity = '0';
    element.style.transform = 'translateY(20px)';
    element.style.transition = 'all 0.5s ease';
    revealObserver.observe(element);
});

// Add revealed class styling
const style = document.createElement('style');
style.textContent = `
    .revealed {
        opacity: 1 !important;
        transform: translateY(0) !important;
    }
`;
document.head.appendChild(style);

// Know More button functionality
document.querySelectorAll('.btn-know-more').forEach(button => {
    button.addEventListener('click', function() {
        const courseName = this.closest('.course-card').querySelector('h3').textContent;
        alert(`To know more about ${courseName}, please contact us at +91-XXXXXXXXXX or fill the form below.`);
        scrollToForm();
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

// Scroll to top button functionality
const scrollTopBtn = document.getElementById('scrollTopBtn');

if (scrollTopBtn) {
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            scrollTopBtn.style.display = 'flex';
        } else {
            scrollTopBtn.style.display = 'none';
        }
    });

    scrollTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}
