document.addEventListener('DOMContentLoaded', function() {
    // Gestion de la navigation au clavier
    const focusableElements = 'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';
    
    // Gestion du focus pour le menu mobile
    const navbar = document.querySelector('.navbar');
    const navbarToggler = document.querySelector('.navbar-toggler');
    const navbarCollapse = document.querySelector('.navbar-collapse');
    
    navbarToggler.addEventListener('click', function() {
        setTimeout(() => {
            if (navbarCollapse.classList.contains('show')) {
                navbarCollapse.querySelector('a').focus();
            }
        }, 100);
    });

    // Gestion des touches d'accessibilité
    document.addEventListener('keydown', function(e) {
        // Échap ferme le menu mobile
        if (e.key === 'Escape' && navbarCollapse.classList.contains('show')) {
            navbarToggler.click();
            navbarToggler.focus();
        }
        
        // Alt + haut pour remonter en haut de page
        if (e.altKey && e.key === 'ArrowUp') {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    });

    // Annonce les messages d'erreur de formulaire aux lecteurs d'écran
    const form = document.querySelector('.contact-form');
    if (form) {
        const inputs = form.querySelectorAll('input, textarea, select');
        
        inputs.forEach(input => {
            input.addEventListener('invalid', function(e) {
                e.preventDefault();
                input.setAttribute('aria-invalid', 'true');
                
                // Créer ou mettre à jour le message d'erreur
                let errorId = input.id + '-error';
                let errorElement = document.getElementById(errorId);
                
                if (!errorElement) {
                    errorElement = document.createElement('div');
                    errorElement.id = errorId;
                    errorElement.className = 'form-text text-danger';
                    errorElement.setAttribute('role', 'alert');
                    input.parentNode.appendChild(errorElement);
                }
                
                errorElement.textContent = input.validationMessage;
                input.setAttribute('aria-describedby', errorId);
            });
            
            input.addEventListener('input', function() {
                if (input.checkValidity()) {
                    input.removeAttribute('aria-invalid');
                    const errorElement = document.getElementById(input.id + '-error');
                    if (errorElement) {
                        errorElement.remove();
                    }
                }
            });
        });
    }
});
