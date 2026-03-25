// Authentication JavaScript

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

// Password toggle functionality
function togglePasswordVisibility(inputId, toggleIcon) {
    const password = document.getElementById(inputId);
    const type = password.getAttribute('type') === 'password' ? 'text' : 'password';
    password.setAttribute('type', type);
    
    toggleIcon.classList.toggle('fa-eye');
    toggleIcon.classList.toggle('fa-eye-slash');
}

// Email validation
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Phone validation
function isValidPhone(phone) {
    const phoneRegex = /^(\+94|0)?[1-9]\d{8}$/;
    return phoneRegex.test(phone.replace(/\s+/g, ''));
}

// Show field error
function showFieldError(field, message) {
    field.classList.add('is-invalid');
    const feedback = field.parentNode.querySelector('.invalid-feedback');
    if (feedback) {
        feedback.textContent = message;
    }
}

// Clear field error
function clearFieldError(field) {
    field.classList.remove('is-invalid');
    const feedback = field.parentNode.querySelector('.invalid-feedback');
    if (feedback) {
        feedback.textContent = '';
    }
}

// Password strength checker
function checkPasswordStrength(password) {
    const strengthContainer = document.getElementById('passwordStrength');
    const strengthBars = strengthContainer.querySelectorAll('.strength-bar');
    const strengthText = document.getElementById('strengthText');
    
    if (password.length === 0) {
        strengthContainer.style.display = 'none';
        return;
    }
    
    strengthContainer.style.display = 'block';
    
    let strength = 0;
    let strengthLabel = 'Very Weak';
    
    // Length check
    if (password.length >= 8) strength++;
    if (password.length >= 12) strength++;
    
    // Character variety checks
    if (/[a-z]/.test(password)) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/[0-9]/.test(password)) strength++;
    if (/[^A-Za-z0-9]/.test(password)) strength++;
    
    // Reset bars
    strengthBars.forEach(bar => {
        bar.classList.remove('weak', 'medium', 'strong');
    });
    
    // Set strength level
    if (strength <= 2) {
        strengthLabel = 'Weak';
        for (let i = 0; i < Math.min(strength, 2); i++) {
            strengthBars[i].classList.add('weak');
        }
    } else if (strength <= 4) {
        strengthLabel = 'Medium';
        for (let i = 0; i < Math.min(strength, 4); i++) {
            strengthBars[i].classList.add('medium');
        }
    } else {
        strengthLabel = 'Strong';
        strengthBars.forEach(bar => bar.classList.add('strong'));
    }
    
    strengthText.textContent = strengthLabel;
}

// Social login function
function socialLogin(provider) {
    alert(`${provider.charAt(0).toUpperCase() + provider.slice(1)} login coming soon!`);
    // Here you would integrate with actual social login providers
}

// Social signup function
function socialSignup(provider) {
    alert(`${provider.charAt(0).toUpperCase() + provider.slice(1)} signup coming soon!`);
}

// Initialize authentication page
document.addEventListener('DOMContentLoaded', function() {
    // Password toggle functionality
    const togglePassword = document.getElementById('togglePassword');
    const toggleConfirmPassword = document.getElementById('toggleConfirmPassword');
    
    if (togglePassword) {
        togglePassword.addEventListener('click', function () {
            togglePasswordVisibility('password', this);
        });
    }
    
    if (toggleConfirmPassword) {
        toggleConfirmPassword.addEventListener('click', function () {
            togglePasswordVisibility('confirmPassword', this);
        });
    }
    
    // Password strength checker
    const passwordInput = document.getElementById('password');
    if (passwordInput) {
        passwordInput.addEventListener('input', function() {
            checkPasswordStrength(this.value);
        });
    }
    
    // Real-time validation
    document.querySelectorAll('.form-control').forEach(input => {
        input.addEventListener('blur', function() {
            if (this.required && !this.value.trim()) {
                showFieldError(this, 'This field is required');
            } else if (this.type === 'email' && this.value && !isValidEmail(this.value)) {
                showFieldError(this, 'Please enter a valid email address');
            } else if (this.type === 'tel' && this.value && !isValidPhone(this.value)) {
                showFieldError(this, 'Please enter a valid phone number');
            } else if (this.id === 'confirmPassword' && this.value !== document.getElementById('password').value) {
                showFieldError(this, 'Passwords do not match');
            } else {
                clearFieldError(this);
                this.classList.add('is-valid');
            }
        });

        input.addEventListener('input', function() {
            if (this.classList.contains('is-invalid')) {
                clearFieldError(this);
            }
        });
    });
    
    // Auto-focus first input
    const firstInput = document.querySelector('.form-control');
    if (firstInput) {
        firstInput.focus();
    }
    
    // Enter key submission
    document.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            const form = document.querySelector('form');
            if (form) {
                form.dispatchEvent(new Event('submit'));
            }
        }
    });
    
    // Handle back button clicks with animation
    const backButton = document.querySelector('.back-button');
    if (backButton) {
        backButton.addEventListener('click', function(e) {
            e.preventDefault();
            animateButtonClick(this, () => {
                window.location.href = 'index.html';
            });
        });
    }
    
    // Handle navbar brand clicks with animation
    const navbarBrand = document.querySelector('.navbar-brand');
    if (navbarBrand) {
        navbarBrand.addEventListener('click', function(e) {
            e.preventDefault();
            showPageTransition();
            setTimeout(() => {
                window.location.href = 'index.html';
            }, 500);
        });
    }
});
