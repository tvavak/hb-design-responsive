// Gestion du bouton retour en haut et du défilement fluide vers le formulaire
document.addEventListener('DOMContentLoaded', function() {
    // Gestion du défilement fluide pour tous les liens internes
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                // Calculer l'offset pour le scroll
                const headerOffset = 100; // Ajuster selon la hauteur de votre header fixe
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });

                // Si c'est un lien vers le formulaire, focus sur le premier champ
                if (targetId === '#contact-form') {
                    setTimeout(() => {
                        const firstInput = targetElement.querySelector('input, textarea');
                        if (firstInput) firstInput.focus();
                    }, 800); // Attendre la fin du défilement
                }
            }
        });
    });

    // Gestion du bouton "Retour en haut"
    const backToTop = document.querySelector('.back-to-top');
    
    // Afficher/masquer le bouton en fonction du défilement
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            backToTop.classList.add('visible');
        } else {
            backToTop.classList.remove('visible');
        }
    });

    // Défilement fluide vers le haut lors du clic
    backToTop.addEventListener('click', function(e) {
        e.preventDefault();
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
});
