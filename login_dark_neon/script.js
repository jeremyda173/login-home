document.getElementById('submitBtn').addEventListener('click', function(e) {
    e.preventDefault();
    const btn = this;
    
    // Simple glitch effect or submission simulation
    btn.style.background = '#fff';
    btn.style.color = '#000';
    btn.style.boxShadow = '0 0 10px #fff, 0 0 20px #fff';
    btn.innerText = 'ACCEDIENDO...';
    
    setTimeout(() => {
        alert('Acceso Concedido (Simulación Neon)');
        btn.style.background = 'transparent';
        btn.style.color = '#03e9f4';
        btn.style.boxShadow = 'none';
        btn.innerText = 'INGRESAR';
        
        // Clear inputs
        document.querySelectorAll('input').forEach(input => input.value = '');
    }, 1500);
});

// Add random glitch animation to title occasionally
const title = document.querySelector('h2');
setInterval(() => {
    if (Math.random() > 0.9) {
        title.style.textShadow = '2px 0 red, -2px 0 blue';
        setTimeout(() => {
            title.style.textShadow = '0 0 10px #03e9f4, 0 0 20px #03e9f4';
        }, 100);
    }
}, 2000);
