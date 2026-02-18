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
        radius: 150
    }

    window.addEventListener('mousemove', (event) => {
        mouse.x = event.x;
        mouse.y = event.y;
    });
    
    // Clear mouse position when leaving window to avoid stuck particles
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
            this.color = color;
        }

        // Method to draw individual particle
        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
            ctx.fillStyle = this.color;
            ctx.fill();
        }

        // Check particle position, check mouse position, move the particle, draw the particle
        update() {
            // Check if particle is still within canvas
            if (this.x > canvas.width || this.x < 0) {
                this.directionX = -this.directionX;
            }
            if (this.y > canvas.height || this.y < 0) {
                this.directionY = -this.directionY;
            }

            // Check collision detection - mouse position / particle position
            let dx = mouse.x - this.x;
            let dy = mouse.y - this.y;
            let distance = Math.sqrt(dx*dx + dy*dy);
            
            // "Fills with little balls" effect: If mouse is close, attract or enlarge potentially
            // BUT user said "se llene" (fills up). Let's spawn more or make them visible/bigger.
            // Let's implement a connection effect + bubble size increase
            if (distance < mouse.radius) {
                if (mouse.x < this.x && this.x < canvas.width - this.size * 10) {
                    this.x += 2; // Move away slightly or attract? Let's attract for "filling"
                }
                if (mouse.x > this.x && this.x > this.size * 10) {
                   this.x -= 2;
                }
                if (mouse.y < this.y && this.y < canvas.height - this.size * 10) {
                    this.y += 2;
                }
                if (mouse.y > this.y && this.y > this.size * 10) {
                    this.y -= 2;
                }
                // Increase size
                if (this.size < 8) this.size += 0.2;
            } else {
                if (this.size > 3) this.size -= 0.2;
            }

            // Move particle
            this.x += this.directionX;
            this.y += this.directionY;

            // Draw particle
            this.draw();
        }
    }

    // Create particle array
    function init() {
        particlesArray = [];
        let numberOfParticles = (canvas.height * canvas.width) / 9000;
        for (let i = 0; i < numberOfParticles; i++) {
            let size = (Math.random() * 3) + 1; // Variable size
            let x = (Math.random() * ((innerWidth - size * 2) - (size * 2)) + size * 2);
            let y = (Math.random() * ((innerHeight - size * 2) - (size * 2)) + size * 2);
            let directionX = (Math.random() * 2) - 1; // Speed vector
            let directionY = (Math.random() * 2) - 1;
            
            // Random colors from theme
            const colors = ['rgba(79, 70, 229, 0.4)', 'rgba(236, 72, 153, 0.4)', 'rgba(255, 255, 255, 0.3)'];
            let color = colors[Math.floor(Math.random() * colors.length)];

            particlesArray.push(new Particle(x, y, directionX, directionY, size, color));
        }
    }

    // Animation Loop
    function animate() {
        requestAnimationFrame(animate);
        ctx.clearRect(0, 0, innerWidth, innerHeight);

        for (let i = 0; i < particlesArray.length; i++) {
            particlesArray[i].update();
        }
        connect();
    }

    // Check if particles are close enough to draw line between them
    function connect() {
        let opacityValue = 1;
        for (let a = 0; a < particlesArray.length; a++) {
            for (let b = a; b < particlesArray.length; b++) {
                let distance = ((particlesArray[a].x - particlesArray[b].x) * (particlesArray[a].x - particlesArray[b].x))
                + ((particlesArray[a].y - particlesArray[b].y) * (particlesArray[a].y - particlesArray[b].y));
                
                // Connect particles to each other
                if (distance < (canvas.width/7) * (canvas.height/7)) {
                    opacityValue = 1 - (distance/20000);
                     // Mouse interaction: Make lines stronger near mouse
                    let dx = mouse.x - particlesArray[a].x;
                    let dy = mouse.y - particlesArray[a].y;
                    let mouseDistance = Math.sqrt(dx*dx + dy*dy);

                    if (mouseDistance < 150) {
                        ctx.strokeStyle = 'rgba(79, 70, 229,' + (opacityValue + 0.2) + ')'; // Stronger color near mouse
                        ctx.lineWidth = 1.5;
                    } else {
                        ctx.strokeStyle = 'rgba(200, 200, 200,' + (opacityValue * 0.2) + ')';
                         ctx.lineWidth = 0.5;
                    }
                    
                    if (mouseDistance < 250) { // Only connect if near mouse or generally close?
                        // Draw line
                        ctx.beginPath();
                        ctx.moveTo(particlesArray[a].x, particlesArray[a].y);
                        ctx.lineTo(particlesArray[b].x, particlesArray[b].y);
                        ctx.stroke();
                    }
                }
            }
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
