// Main JavaScript for Aurora Cinema

// Page Loader
window.addEventListener('load', function() {
    const loader = document.getElementById('pageLoader');
    if (loader) {
        setTimeout(() => {
            loader.style.opacity = '0';
            setTimeout(() => {
                loader.style.display = 'none';
            }, 500);
        }, 1000);
    }
});

// Navbar Scroll Effect
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar-custom');
    if (navbar && window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else if (navbar) {
        navbar.classList.remove('scrolled');
    }
});

// Smooth Scrolling
function scrollToMovies() {
    const moviesSection = document.querySelector('#movies');
    if (moviesSection) {
        moviesSection.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}

// Professional Redirect Animation Functions
function showPageTransition() {
    const pageTransition = document.getElementById('pageTransition');
    if (pageTransition) {
        pageTransition.classList.add('active');
    }
}

function hidePageTransition() {
    const pageTransition = document.getElementById('pageTransition');
    if (pageTransition) {
        pageTransition.classList.remove('active');
    }
}

function animateButtonClick(button, callback) {
    // Add loading class to button
    button.classList.add('loading');
    button.disabled = true;
    
    // Show page transition after a short delay
    setTimeout(() => {
        showPageTransition();
        
        // Execute callback after transition is visible
        setTimeout(() => {
            callback();
        }, 500);
    }, 800);
}

// Navigation Functions with Professional Animations
function goToLogin() {
    const loginBtn = document.querySelector('.btn-login');
    if (loginBtn) {
        animateButtonClick(loginBtn, () => {
            window.location.href = 'login.html';
        });
    } else {
        // Fallback for direct calls
        showPageTransition();
        setTimeout(() => {
            window.location.href = 'login.html';
        }, 500);
    }
}

function goToSignup() {
    const signupBtn = document.querySelector('.btn-signup');
    if (signupBtn) {
        animateButtonClick(signupBtn, () => {
            window.location.href = 'signup.html';
        });
    } else {
        // Fallback for direct calls
        showPageTransition();
        setTimeout(() => {
            window.location.href = 'signup.html';
        }, 500);
    }
}

// Movie Functions
function playTrailer(movieId) {
    // YouTube trailer URLs for each movie
    const trailerUrls = {
        'avatar': 'https://www.youtube.com/watch?v=d9MyW72ELq0',
        'topgun': 'https://www.youtube.com/watch?v=qSqVVswa420',
        'blackpanther': 'https://www.youtube.com/watch?v=_Z3QKkl1WyM',
        'spiderman': 'https://www.youtube.com/watch?v=JfVOs4VSpmA'
    };
    
    // Get the trailer URL for the movie
    const trailerUrl = trailerUrls[movieId];
    
    if (trailerUrl) {
        // Open the YouTube trailer in a new tab
        window.open(trailerUrl, '_blank');
    } else {
        // Fallback for unknown movies
        alert(`Trailer not found for ${movieId}`);
    }
}

function bookMovie(movieTitle) {
    // Store movie info and redirect to seat selection
    localStorage.setItem('selectedMovie', movieTitle);
    
    // Clear any cached redirects and force redirect to seat selection
    console.log('Redirecting to seat selection for:', movieTitle);
    window.location.replace(`seatselection.html?movie=${encodeURIComponent(movieTitle)}&t=${Date.now()}`);
}

// Book Now button function - no redirect
function goToSeatSelection(movieTitle) {
    localStorage.setItem('selectedMovie', movieTitle);
    // No redirect - button click is handled without navigation
}

// Counter Animation
function animateCounters() {
    const counters = document.querySelectorAll('[data-count]');
    counters.forEach(counter => {
        const target = parseInt(counter.getAttribute('data-count'));
        let current = 0;
        const increment = target / 100;
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                counter.textContent = target.toLocaleString();
                clearInterval(timer);
            } else {
                counter.textContent = Math.floor(current).toLocaleString();
            }
        }, 20);
    });
}

// Intersection Observer for Animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in-up');
            
            // Animate counters when they come into view
            if (entry.target.querySelector('[data-count]')) {
                animateCounters();
            }
        }
    });
}, observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', function() {
    const animatedElements = document.querySelectorAll('.movie-card, .feature-card, .section-title');
    animatedElements.forEach(el => observer.observe(el));

    // Observe stats section
    const statsSection = document.querySelector('[data-count]')?.closest('section');
    if (statsSection) {
        observer.observe(statsSection);
    }
});

// Parallax Effect
window.addEventListener('scroll', function() {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero-section');
    if (hero) {
        const rate = scrolled * -0.5;
        hero.style.transform = `translateY(${rate}px)`;
    }
});

// Mobile Navigation
document.addEventListener('DOMContentLoaded', function() {
    const navLinks = document.querySelectorAll('.nav-link');
    const navCollapse = document.querySelector('.navbar-collapse');
    
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (navCollapse && navCollapse.classList.contains('show')) {
                const bsCollapse = new bootstrap.Collapse(navCollapse);
                bsCollapse.hide();
            }
        });
    });
});

// Dynamic Year in Footer
document.addEventListener('DOMContentLoaded', function() {
    const currentYearElement = document.getElementById('currentYear');
    if (currentYearElement) {
        currentYearElement.textContent = new Date().getFullYear();
    }
});

// Movie Card Click Events - Removed to prevent conflicts with Book Now button

// Smooth scrolling for all internal links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const headerOffset = 80;
            const elementPosition = target.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Professional Button Click Handlers
document.addEventListener('DOMContentLoaded', function() {
    // Handle login button clicks
    const loginBtn = document.querySelector('.btn-login');
    if (loginBtn) {
        loginBtn.addEventListener('click', function(e) {
            e.preventDefault();
            goToLogin();
        });
    }
    
    // Handle signup button clicks
    const signupBtn = document.querySelector('.btn-signup');
    if (signupBtn) {
        signupBtn.addEventListener('click', function(e) {
            e.preventDefault();
            goToSignup();
        });
    }
    
    // Handle other buttons with loading states (excluding login/signup)
    const otherButtons = document.querySelectorAll('.btn:not(.btn-login):not(.btn-signup)');
    
    otherButtons.forEach(button => {
        button.addEventListener('click', function() {
            if (!this.classList.contains('no-loading') && !this.href) {
                const originalText = this.innerHTML;
                this.innerHTML = '<i class="fas fa-spinner fa-spin me-1"></i>Loading...';
                this.disabled = true;
                
                setTimeout(() => {
                    this.innerHTML = originalText;
                    this.disabled = false;
                }, 1500);
            }
        });
    });
});

// Preload images for better performance
function preloadImages() {
    const imageUrls = [
        'https://image.tmdb.org/t/p/w500/t6HIqrRAclMCA60NsSmeqe9RmNV.jpg',
        'https://image.tmdb.org/t/p/w500/62HCnUTziyWcpDaBO2i1DX17ljH.jpg',
        'https://image.tmdb.org/t/p/w500/sv1xJUazXeYqALzczSZ3O6nkH75.jpg',
        'https://image.tmdb.org/t/p/w500/1g0dhYtq4irTY1GPXvft6k4YLjm.jpg'
    ];
    
    imageUrls.forEach(url => {
        const img = new Image();
        img.src = url;
    });
}

// Initialize preloading
window.addEventListener('load', preloadImages);

// Back to Home functionality
function goToHomePage() {
    window.location.href = 'index.html';
}

// Handle back button clicks
document.addEventListener('DOMContentLoaded', function() {
    const backButtons = document.querySelectorAll('.back-button, .back-to-home, .home-btn');
    backButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            goToHomePage();
        });
    });
    
    // Handle navbar brand clicks
    const navbarBrand = document.querySelector('.navbar-brand');
    if (navbarBrand) {
        navbarBrand.addEventListener('click', function(e) {
            e.preventDefault();
            goToHomePage();
        });
    }
});
