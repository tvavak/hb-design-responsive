document.addEventListener('DOMContentLoaded', () => {
    const floatingButtons = document.querySelector('.floating-buttons');
    const scrollTopButton = document.querySelector('.scroll-top');
    const hero = document.querySelector('.hero');
    
    const updateButtons = () => {
        if (!hero || !floatingButtons || !scrollTopButton) return;
        
        const heroBottom = hero.getBoundingClientRect().bottom;
        const isMobile = window.innerWidth <= 768;
        
        // Sur mobile, on montre les deux boutons après le hero
        if (isMobile) {
            if (heroBottom < 0) {
                floatingButtons.classList.add('visible');
            } else {
                floatingButtons.classList.remove('visible');
            }
        }
        
        // Le bouton remonter est toujours visible après le hero, sur desktop et mobile
        if (heroBottom < 0) {
            scrollTopButton.classList.add('visible');
        } else {
            scrollTopButton.classList.remove('visible');
        }
    };
    
    scrollTopButton.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    window.addEventListener('scroll', updateButtons);
    window.addEventListener('resize', updateButtons);
    updateButtons();
});
