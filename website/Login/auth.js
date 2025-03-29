// Authentication functionality

document.addEventListener('DOMContentLoaded', function() {
    // Toggle password visibility
    const togglePasswordButtons = document.querySelectorAll('.toggle-password');
    togglePasswordButtons.forEach(button => {
        button.addEventListener('click', function() {
            const input = this.previousElementSibling;
            const type = input.getAttribute('type') === 'password' ? 'text' : 'password';
            input.setAttribute('type', type);
            this.classList.toggle('fa-eye');
            this.classList.toggle('fa-eye-slash');
        });
    });

    // Login form validation
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            let isValid = true;
            const email = document.getElementById('email');
            const password = document.getElementById('password');
            
            // Reset error messages
            document.querySelectorAll('.error-message').forEach(el => {
                el.style.display = 'none';
            });
            
            // Email validation
            if (!validateEmail(email.value)) {
                showError(email, 'emailError', 'Please enter a valid email address');
                isValid = false;
            }
            
            // Password validation
            if (password.value.length < 6) {
                showError(password, 'passwordError', 'Password must be at least 6 characters');
                isValid = false;
            }
            
            if (isValid) {
                // Show loading state
                const submitButton = loginForm.querySelector('button[type="submit"]');
                const originalText = submitButton.innerHTML;
                submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Signing In...';
                submitButton.disabled = true;
                
                // Simulate API call
                setTimeout(() => {
                    // Redirect to dashboard on success
                    window.location.href = 'index.html';
                    
                    // Reset button state (in case redirect fails)
                    submitButton.innerHTML = originalText;
                    submitButton.disabled = false;
                }, 1500);
            }
        });
    }
    
    // Registration form validation
    const registerForm = document.getElementById('registerForm');
    if (registerForm) {
        const passwordInput = document.getElementById('password');
        const confirmPasswordInput = document.getElementById('confirmPassword');
        
        // Password strength meter
        if (passwordInput) {
            passwordInput.addEventListener('input', function() {
                updatePasswordStrength(this.value);
            });
        }
        
        registerForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            let isValid = true;
            const firstName = document.getElementById('firstName');
            const lastName = document.getElementById('lastName');
            const email = document.getElementById('email');
            const phone = document.getElementById('phone');
            const password = passwordInput;
            const confirmPassword = confirmPasswordInput;
            const termsAgree = document.getElementById('termsAgree');
            
            // Reset error messages
            document.querySelectorAll('.error-message').forEach(el => {
                el.style.display = 'none';
            });
            
            // First name validation
            if (firstName.value.trim() === '') {
                showError(firstName, 'firstNameError', 'First name is required');
                isValid = false;
            }
            
            // Last name validation
            if (lastName.value.trim() === '') {
                showError(lastName, 'lastNameError', 'Last name is required');
                isValid = false;
            }
            
            // Email validation
            if (!validateEmail(email.value)) {
                showError(email, 'emailError', 'Please enter a valid email address');
                isValid = false;
            }
            
            // Phone validation
            if (!validatePhone(phone.value)) {
                showError(phone, 'phoneError', 'Please enter a valid phone number');
                isValid = false;
            }
            
            // Password validation
            if (password.value.length < 8) {
                showError(password, 'passwordError', 'Password must be at least 8 characters');
                isValid = false;
            } else if (!validatePassword(password.value)) {
                showError(password, 'passwordError', 'Password must include uppercase, lowercase, number, and special character');
                isValid = false;
            }
            
            // Confirm password validation
            if (password.value !== confirmPassword.value) {
                showError(confirmPassword, 'confirmPasswordError', 'Passwords do not match');
                isValid = false;
            }
            
            // Terms agreement validation
            if (!termsAgree.checked) {
                showError(termsAgree, 'termsError', 'You must agree to the terms and conditions');
                isValid = false;
            }
            
            if (isValid) {
                // Show loading state
                const submitButton = registerForm.querySelector('button[type="submit"]');
                const originalText = submitButton.innerHTML;
                submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Creating Account...';
                submitButton.disabled = true;
                
                // Simulate API call
                setTimeout(() => {
                    // Redirect to dashboard on success
                    window.location.href = 'index.html';
                    
                    // Reset button state (in case redirect fails)
                    submitButton.innerHTML = originalText;
                    submitButton.disabled = false;
                }, 1500);
            }
        });
    }
    
    // Forgot password form validation
    const forgotPasswordForm = document.getElementById('forgotPasswordForm');
    if (forgotPasswordForm) {
        forgotPasswordForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            let isValid = true;
            const email = document.getElementById('email');
            
            // Reset error messages
            document.querySelectorAll('.error-message').forEach(el => {
                el.style.display = 'none';
            });
            
            // Email validation
            if (!validateEmail(email.value)) {
                showError(email, 'emailError', 'Please enter a valid email address');
                isValid = false;
            }
            
            if (isValid) {
                // Show loading state
                const submitButton = forgotPasswordForm.querySelector('button[type="submit"]');
                const originalText = submitButton.innerHTML;
                submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
                submitButton.disabled = true;
                
                // Simulate API call
                setTimeout(() => {
                    // Show success message
                    forgotPasswordForm.innerHTML = `
                        <div class="success-message fade-in">
                            <i class="fas fa-check-circle success-icon"></i>
                            <h2>Email Sent!</h2>
                            <p>We've sent a password reset link to ${email.value}</p>
                            <p class="small-text">Please check your inbox and follow the instructions to reset your password.</p>
                            <a href="login.html" class="auth-button">
                                <span>Back to Login</span>
                                <i class="fas fa-arrow-right"></i>
                            </a>
                        </div>
                    `;
                }, 1500);
            }
        });
    }
    
    // Helper functions
    function validateEmail(email) {
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }
    
    function validatePhone(phone) {
        const re = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/;
        return re.test(String(phone));
    }
    
    function validatePassword(password) {
        // At least 8 characters, 1 uppercase, 1 lowercase, 1 number, 1 special character
        const re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        return re.test(String(password));
    }
    
    function showError(inputElement, errorId, message) {
        const errorElement = document.getElementById(errorId);
        if (errorElement) {
            errorElement.textContent = message;
            errorElement.style.display = 'block';
            inputElement.classList.add('shake');
            
            // Remove shake animation after it completes
            setTimeout(() => {
                inputElement.classList.remove('shake');
            }, 500);
        }
    }
    
    function updatePasswordStrength(password) {
        const strengthMeter = document.querySelector('.strength-meter');
        const strengthText = document.querySelector('.strength-text');
        
        if (!strengthMeter || !strengthText) return;
        
        const sections = strengthMeter.querySelectorAll('.meter-section');
        
        // Reset all sections
        sections.forEach(section => {
            section.className = 'meter-section';
        });
        
        // Calculate password strength
        let strength = 0;
        
        // Length check
        if (password.length >= 8) strength += 1;
        
        // Uppercase check
        if (/[A-Z]/.test(password)) strength += 1;
        
        // Lowercase check
        if (/[a-z]/.test(password)) strength += 1;
        
        // Number check
        if (/[0-9]/.test(password)) strength += 1;
        
        // Special character check
        if (/[^A-Za-z0-9]/.test(password)) strength += 1;
        
        // Update strength meter
        if (password.length === 0) {
            strengthText.textContent = 'Password strength';
        } else if (strength <= 2) {
            for (let i = 0; i < 1; i++) {
                sections[i].classList.add('weak');
            }
            strengthText.textContent = 'Weak password';
        } else if (strength <= 4) {
            for (let i = 0; i < 3; i++) {
                sections[i].classList.add('medium');
            }
            strengthText.textContent = 'Medium password';
        } else {
            for (let i = 0; i < 4; i++) {
                sections[i].classList.add('strong');
            }
            strengthText.textContent = 'Strong password';
        }
    }
});