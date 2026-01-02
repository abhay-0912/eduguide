// Courses Page JavaScript

// Smooth scroll to form with optional course pre-selection
function scrollToForm(course = '') {
    const form = document.getElementById('registration-form');
    if (form) {
        form.scrollIntoView({ behavior: 'smooth', block: 'start' });
        
        // Pre-select course if provided
        if (course) {
            const courseSelect = document.getElementById('course');
            if (courseSelect) {
                // Convert course name to lowercase for matching
                const courseValue = course.toLowerCase().replace(/\s+/g, '');
                
                // Map course names to select options
                const courseMap = {
                    'engineering': 'engineering',
                    'medical': 'medical',
                    'management': 'management',
                    'commerce': 'commerce',
                    'computercourses': 'computer',
                    'law': 'law',
                    'arts': 'arts',
                    'distanceeducation': 'distance',
                    'science': 'science',
                    'education': 'education'
                };
                
                const mappedValue = courseMap[courseValue];
                if (mappedValue) {
                    courseSelect.value = mappedValue;
                    courseSelect.style.backgroundColor = '#fffacd';
                    setTimeout(() => {
                        courseSelect.style.backgroundColor = '';
                    }, 2000);
                }
            }
        }
    }
}

// Form submission handler
document.addEventListener('DOMContentLoaded', function() {
    const courseForm = document.getElementById('courseForm');
    
    if (courseForm) {
        courseForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const formData = {
                name: document.getElementById('name').value,
                mobile: document.getElementById('mobile').value,
                email: document.getElementById('email').value,
                course: document.getElementById('course').value,
                currentEducation: document.getElementById('current-education').value,
                mode: document.getElementById('mode').value
            };
            
            // Validate mobile number
            if (formData.mobile.length !== 10) {
                alert('Please enter a valid 10-digit mobile number');
                return;
            }
            
            // Show success message
            alert('Thank you for your interest! Our counsellor will contact you shortly.');
            
            // Log form data (in production, send to server)
            console.log('Form submitted:', formData);
            
            // Reset form
            courseForm.reset();
            
            // In production, you would send the data to your server here
            // Example:
            // fetch('/api/submit-course-form', {
            //     method: 'POST',
            //     headers: { 'Content-Type': 'application/json' },
            //     body: JSON.stringify(formData)
            // })
            // .then(response => response.json())
            // .then(data => {
            //     alert('Thank you! We will contact you soon.');
            //     courseForm.reset();
            // })
            // .catch(error => {
            //     alert('An error occurred. Please try again.');
            //     console.error('Error:', error);
            // });
        });
    }
    
    // Add animation on scroll for course categories
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);
    
    // Observe all course categories
    document.querySelectorAll('.course-category').forEach(category => {
        observer.observe(category);
    });
    
    // Mobile menu toggle
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (mobileMenuToggle && navMenu) {
        mobileMenuToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
        });
        
        // Close menu when clicking links
        document.querySelectorAll('.nav-menu a').forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
            });
        });
    }
    
    // Add hover effect sound (optional - uncomment if you want sound effects)
    /*
    const buttons = document.querySelectorAll('.btn-counselling, .btn-large, .btn-submit');
    buttons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            // Add subtle visual feedback
            this.style.transition = 'all 0.3s ease';
        });
    });
    */
    
    // Scroll to top button (optional enhancement)
    const scrollToTopBtn = document.createElement('button');
    scrollToTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
    scrollToTopBtn.className = 'scroll-to-top';
    scrollToTopBtn.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        background: var(--primary-color);
        color: white;
        border: none;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        font-size: 20px;
        cursor: pointer;
        display: none;
        z-index: 1000;
        box-shadow: 0 5px 15px rgba(0,0,0,0.3);
        transition: all 0.3s;
    `;
    
    document.body.appendChild(scrollToTopBtn);
    
    // Show/hide scroll to top button
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            scrollToTopBtn.style.display = 'block';
        } else {
            scrollToTopBtn.style.display = 'none';
        }
    });
    
    // Scroll to top on button click
    scrollToTopBtn.addEventListener('click', function() {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
    
    // Add hover effect to scroll to top button
    scrollToTopBtn.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-5px)';
    });
    
    scrollToTopBtn.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
    });
});

// Smooth scrolling for anchor links
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

// Add loading animation for images
document.addEventListener('DOMContentLoaded', function() {
    const images = document.querySelectorAll('.category-image img');
    
    images.forEach(img => {
        img.style.opacity = '0';
        img.style.transition = 'opacity 0.5s ease-in';
        
        img.addEventListener('load', function() {
            this.style.opacity = '1';
        });
        
        // If image is already loaded (cached)
        if (img.complete) {
            img.style.opacity = '1';
        }
    });
});
