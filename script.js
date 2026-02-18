document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('loginForm');
    const submitBtn = document.getElementById('submitBtn');

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Minimalist loading state
        const originalText = submitBtn.textContent;
        submitBtn.textContent = 'Procesando...';
        submitBtn.style.opacity = '0.8';
        submitBtn.disabled = true;

        // Simulate API call
        setTimeout(() => {
            submitBtn.textContent = '¡Bienvenido!';
            submitBtn.style.backgroundColor = '#1a1a1a'; // Keep it dark
            
            setTimeout(() => {
                alert('Sesión iniciada correctamente');
                // Reset
                submitBtn.textContent = originalText;
                submitBtn.style.opacity = '1';
                submitBtn.disabled = false;
                form.reset();
            }, 600);
        }, 1500);
    });
});
