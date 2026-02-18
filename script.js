document.addEventListener('DOMContentLoaded', () => {
    // Elements
    const loginForm = document.getElementById('loginForm');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const togglePasswordBtn = document.getElementById('togglePassword');
    const emailError = document.getElementById('emailError');
    const passwordError = document.getElementById('passwordError');
    const submitBtn = document.getElementById('submitBtn');
    const btnText = submitBtn.querySelector('span');
    const spinner = document.getElementById('loadingSpinner');

    // Toggle Password Visibility
    togglePasswordBtn.addEventListener('click', () => {
        const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
        passwordInput.setAttribute('type', type);
        
        // Toggle Icon
        const icon = togglePasswordBtn.querySelector('i');
        icon.classList.toggle('fa-eye');
        icon.classList.toggle('fa-eye-slash');
    });

    // Real-time Validation
    emailInput.addEventListener('input', () => {
        clearError(emailInput, emailError);
        const group = emailInput.closest('.input-group');
        if (validateEmail(emailInput.value)) {
            group.classList.add('valid');
        } else {
            group.classList.remove('valid');
        }
    });

    passwordInput.addEventListener('input', () => {
        clearError(passwordInput, passwordError);
        const group = passwordInput.closest('.input-group');
        if (passwordInput.value.length >= 6) {
             group.classList.add('valid');
        } else {
             group.classList.remove('valid');
        }
    });

    // Form Submission
    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Reset Errors
        clearError(emailInput, emailError);
        clearError(passwordInput, passwordError);

        let isValid = true;

        // Validate Email
        if (!validateEmail(emailInput.value)) {
            showError(emailInput, emailError, 'Por favor, ingresa un correo válido.');
            isValid = false;
        }

        // Validate Password
        if (passwordInput.value.length < 6) {
            showError(passwordInput, passwordError, 'La contraseña debe tener al menos 6 caracteres.');
            isValid = false;
        }

        if (isValid) {
            simulateLogin();
        }
    });

    // Helper Functions
    function validateEmail(email) {
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }

    function showError(input, errorElement, message) {
        input.closest('.input-group').classList.add('error');
        errorElement.textContent = message;
    }

    function clearError(input, errorElement) {
        input.closest('.input-group').classList.remove('error');
        errorElement.textContent = '';
    }

    function simulateLogin() {
        // Show Loading State
        submitBtn.disabled = true;
        submitBtn.classList.add('loading');
        btnText.textContent = 'Iniciando sesión...';
        spinner.style.display = 'block';

        // Simulate API Call
        setTimeout(() => {
            submitBtn.disabled = false;
            submitBtn.classList.remove('loading');
            spinner.style.display = 'none';
            
            // Check credentials (Simulated)
            // For Demo: success
            btnText.textContent = '¡Éxito!';
            btnText.style.color = '#fff';
            
            // Show success animation or redirect
            setTimeout(() => {
                alert('¡Login simulado exitoso!\nBienvenido al sistema.');
                btnText.textContent = 'Iniciar Sesión';
                loginForm.reset();
            }, 500);

        }, 2000);
    }
});
