document.addEventListener('DOMContentLoaded', () => {
    const body = document.body;
    const overlay = document.querySelector('.flashlight-overlay');
    
    // --- Lógica del Efecto de Linterna ---
    document.addEventListener('mousemove', (e) => {
        const x = e.clientX;
        const y = e.clientY;

        // Actualizar variables CSS para la posición del cursor
        body.style.setProperty('--x', `${x}px`);
        body.style.setProperty('--y', `${y}px`);
        
        overlay.style.setProperty('--x', `${x}px`);
        overlay.style.setProperty('--y', `${y}px`);
    });

    // --- Lógica del Formulario de Login ---
    const form = document.getElementById('loginForm');
    const btn = document.getElementById('btn-login');

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const span = btn.querySelector('span');
        const originalText = span.textContent;
        
        // Simulación de proceso de carga
        span.textContent = 'ESCANEA...ACESSO';
        btn.style.borderColor = '#00ff00';
        btn.style.color = '#00ff00';
        btn.style.boxShadow = '0 0 30px #00ff00';
        
        // Efecto de parpadeo
        let flicker = setInterval(() => {
            btn.style.opacity = Math.random() > 0.5 ? '1' : '0.5';
        }, 100);

        setTimeout(() => {
            clearInterval(flicker);
            btn.style.opacity = '1';
            alert('BIENVENIDO A MIKENS.\nAcceso concedido.');
            span.textContent = originalText;
            btn.style.borderColor = 'var(--primary)';
            btn.style.color = 'var(--primary)';
            btn.style.boxShadow = 'none';
        }, 2000);
    });

    // --- Mostrar / Ocultar Contraseña ---
    const togglePassword = document.getElementById('togglePassword');
    const passwordInput = document.getElementById('passwordInput');

    togglePassword.addEventListener('click', () => {
        const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
        passwordInput.setAttribute('type', type);
        
        // Cambiar icono
        togglePassword.classList.toggle('fa-eye');
        togglePassword.classList.toggle('fa-eye-slash');
        
        // Pequeño brillo al hacer clic
        togglePassword.style.textShadow = '0 0 10px var(--primary)';
        setTimeout(() => {
            togglePassword.style.textShadow = 'none';
        }, 300);
    });
});
