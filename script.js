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
    // --- Particle Background Animation ---
    const canvas = document.getElementById('bgCanvas');
    const ctx = canvas.getContext('2d');
    let particlesArray;

    // Set canvas size
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // Mouse Interaction
    const mouse = {
        x: null,
        y: null,
        radius: 120 // Interaction radius
    }

    window.addEventListener('mousemove', (event) => {
        mouse.x = event.x;
        mouse.y = event.y;
    });
    
    // Clear mouse position
    window.addEventListener('mouseout', () => {
        mouse.x = undefined;
        mouse.y = undefined;
    });

    // Create Particle Class
    class Particle {
        constructor(x, y, directionX, directionY, size, color) {
            this.x = x;
            this.y = y;
            this.directionX = directionX;
            this.directionY = directionY;
            this.size = size;
            this.baseSize = size; // Remember original size
            this.color = color;
            this.density = (Math.random() * 30) + 1; // For movement variety
        }

        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
            ctx.fillStyle = this.color;
            ctx.fill();
        }

        update() {
            // Check canvas boundaries
            if (this.x > canvas.width || this.x < 0) {
                this.directionX = -this.directionX;
            }
            if (this.y > canvas.height || this.y < 0) {
                this.directionY = -this.directionY;
            }

            // Mouse Collision & Swarm Logic
            let dx = mouse.x - this.x;
            let dy = mouse.y - this.y;
            let distance = Math.sqrt(dx*dx + dy*dy);
            
            // "Exactamente donde este el mouse" -> Strong attraction
            if (distance < mouse.radius + 50) { // Large catchment area
                // Calculate pull force
                const forceDirectionX = dx / distance;
                const forceDirectionY = dy / distance;
                const force = (mouse.radius - distance) / mouse.radius;
                
                // Move towards mouse (Swarm effect)
                const directionX = forceDirectionX * force * this.density;
                const directionY = forceDirectionY * force * this.density;

                if (distance < mouse.radius) {
                     this.x += directionX * 0.8; // Move closer
                     this.y += directionY * 0.8;
                     // Increase size noticeably
                     if (this.size < 12) this.size += 0.5; 
                } else {
                     // Just nudge towards
                     this.x += directionX * 0.2;
                     this.y += directionY * 0.2;
                }
            } else {
                // Return to normal size
                if (this.size > this.baseSize) {
                    this.size -= 0.5;
                }
                // Normal random movement
                this.x += this.directionX;
                this.y += this.directionY;
            }

            this.draw();
        }
    }

    // Create MANY particles
    function init() {
        particlesArray = [];
        // MUCH higher density: divider reduced from 9000 to 2500
        let numberOfParticles = (canvas.height * canvas.width) / 2500;
        
        for (let i = 0; i < numberOfParticles; i++) {
            let size = (Math.random() * 4) + 1;
            let x = (Math.random() * ((innerWidth - size * 2) - (size * 2)) + size * 2);
            let y = (Math.random() * ((innerHeight - size * 2) - (size * 2)) + size * 2);
            let directionX = (Math.random() * 1) - 0.5; // Slower ambient movement
            let directionY = (Math.random() * 1) - 0.5;
            
            // Vibrant colors
            const colors = ['rgba(79, 70, 229, 0.7)', 'rgba(236, 72, 153, 0.7)', 'rgba(255, 255, 255, 0.6)'];
            let color = colors[Math.floor(Math.random() * colors.length)];

            particlesArray.push(new Particle(x, y, directionX, directionY, size, color));
        }
    }

    function animate() {
        requestAnimationFrame(animate);
        ctx.clearRect(0, 0, innerWidth, innerHeight);

        for (let i = 0; i < particlesArray.length; i++) {
            particlesArray[i].update();
        }
    }

    window.addEventListener('resize', () => {
        canvas.width = innerWidth;
        canvas.height = innerHeight;
        init();
    });

    init();
    animate();
});
