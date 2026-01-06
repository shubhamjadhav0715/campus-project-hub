// Web App URL for Google Apps Script
const WEB_APP_URL = 'https://script.google.com/macros/s/AKfycbwU4ThJjiMR3MSnDAJQpzqdh50-xtlVP1nzlcFwKdxtr5X2lqFiXggafrjtP9aKGBRO/exec';

// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

if (hamburger) {
    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        hamburger.classList.toggle('active');
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!hamburger.contains(e.target) && !navLinks.contains(e.target)) {
            navLinks.classList.remove('active');
            hamburger.classList.remove('active');
        }
    });

    // Close menu when clicking on a link
    const links = navLinks.querySelectorAll('a');
    links.forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            hamburger.classList.remove('active');
        });
    });
}

// Contact Form Handling
const contactForm = document.getElementById('contactForm');

if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const submitButton = contactForm.querySelector('.submit-button');
        const originalText = submitButton.textContent;
        submitButton.textContent = 'Sending...';
        submitButton.disabled = true;
        
        // Get form data
        const formData = {
            formType: 'contact',
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            phone: document.getElementById('phone').value,
            project: document.getElementById('project').value,
            message: document.getElementById('message').value
        };

        try {
            const response = await fetch(WEB_APP_URL, {
                method: 'POST',
                mode: 'no-cors',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData)
            });

            // Since we're using no-cors, we can't read the response
            // But if no error is thrown, it means the request was sent successfully
            
            // Reset form
            contactForm.reset();
            
            // Show success message
            alert('✅ Message sent successfully! We will contact you soon via WhatsApp.');
            
            // Redirect to WhatsApp
            const whatsappMessage = `Hi! I just submitted a contact form on Campus Project Hub.\n\nName: ${formData.name}\nProject Type: ${formData.project}`;
            const encodedMessage = encodeURIComponent(whatsappMessage);
            window.open(`https://wa.me/917744040512?text=${encodedMessage}`, '_blank');
            
        } catch (error) {
            console.error('Error:', error);
            alert('❌ Something went wrong. Please try again or contact us directly on WhatsApp.');
        } finally {
            submitButton.textContent = originalText;
            submitButton.disabled = false;
        }
    });
}

// Review Form Handling
const reviewForm = document.getElementById('reviewForm');

if (reviewForm) {
    reviewForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const submitButton = reviewForm.querySelector('.submit-button');
        const originalText = submitButton.textContent;
        submitButton.textContent = 'Submitting...';
        submitButton.disabled = true;
        
        // Get form data
        const formData = {
            formType: 'review',
            name: document.getElementById('reviewName').value,
            course: document.getElementById('reviewCourse').value,
            year: document.getElementById('reviewYear').value,
            rating: document.getElementById('reviewRating').value,
            review: document.getElementById('reviewMessage').value
        };

        try {
            const response = await fetch(WEB_APP_URL, {
                method: 'POST',
                mode: 'no-cors',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData)
            });

            // Reset form
            reviewForm.reset();
            
            // Show success message
            alert('⭐ Thank you for your review! It will appear on the website after approval.');
            
        } catch (error) {
            console.error('Error:', error);
            alert('❌ Something went wrong. Please try again later.');
        } finally {
            submitButton.textContent = originalText;
            submitButton.disabled = false;
        }
    });
}

// Load and display approved reviews
async function loadApprovedReviews() {
    const reviewsContainer = document.getElementById('approvedReviews');
    
    if (!reviewsContainer) return;
    
    try {
        const response = await fetch(`${WEB_APP_URL}?action=getReviews`);
        const data = await response.json();
        
        if (data.success && data.reviews && data.reviews.length > 0) {
            reviewsContainer.innerHTML = '';
            
            data.reviews.forEach(review => {
                const reviewCard = createReviewCard(review);
                reviewsContainer.appendChild(reviewCard);
            });
        } else {
            reviewsContainer.innerHTML = '<p style="text-align: center; color: #6b7280; padding: 2rem;">No reviews yet. Be the first to share your experience!</p>';
        }
    } catch (error) {
        console.error('Error loading reviews:', error);
        reviewsContainer.innerHTML = '<p style="text-align: center; color: #6b7280; padding: 2rem;">Unable to load reviews at the moment.</p>';
    }
}

// Create review card HTML
function createReviewCard(review) {
    const card = document.createElement('div');
    card.className = 'review-card';
    
    const stars = '⭐'.repeat(review.rating);
    const initial = review.name.charAt(0).toUpperCase();
    const timeAgo = getTimeAgo(new Date(review.timestamp));
    
    card.innerHTML = `
        <div class="review-header">
            <div class="reviewer-info">
                <div class="reviewer-avatar">${initial}</div>
                <div>
                    <h3 class="reviewer-name">${review.name}</h3>
                    <p class="reviewer-course">${review.course} ${review.year}</p>
                </div>
            </div>
            <div class="review-stars">${stars}</div>
        </div>
        <p class="review-text">${review.review}</p>
        <p class="review-date">${timeAgo}</p>
    `;
    
    return card;
}

// Calculate time ago
function getTimeAgo(date) {
    const seconds = Math.floor((new Date() - date) / 1000);
    
    let interval = seconds / 31536000;
    if (interval > 1) return Math.floor(interval) + ' year' + (Math.floor(interval) > 1 ? 's' : '') + ' ago';
    
    interval = seconds / 2592000;
    if (interval > 1) return Math.floor(interval) + ' month' + (Math.floor(interval) > 1 ? 's' : '') + ' ago';
    
    interval = seconds / 604800;
    if (interval > 1) return Math.floor(interval) + ' week' + (Math.floor(interval) > 1 ? 's' : '') + ' ago';
    
    interval = seconds / 86400;
    if (interval > 1) return Math.floor(interval) + ' day' + (Math.floor(interval) > 1 ? 's' : '') + ' ago';
    
    interval = seconds / 3600;
    if (interval > 1) return Math.floor(interval) + ' hour' + (Math.floor(interval) > 1 ? 's' : '') + ' ago';
    
    interval = seconds / 60;
    if (interval > 1) return Math.floor(interval) + ' minute' + (Math.floor(interval) > 1 ? 's' : '') + ' ago';
    
    return 'Just now';
}

// Load reviews when page loads
document.addEventListener('DOMContentLoaded', () => {
    loadApprovedReviews();
});

// Smooth Scrolling for anchor links
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

// Add animation on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for animation
document.querySelectorAll('.feature-card, .service-item, .about-feature, .reason, .contact-method, .review-card').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});