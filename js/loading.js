// Loading animation handler
document.addEventListener('DOMContentLoaded', function() {
    console.log('Loading script initialized');

    const preloader = document.querySelector('.preloader');
    const loader = preloader.querySelector('.loader');
    
    // Add logo to existing loader
    const loadingLogo = document.createElement('img');
    loadingLogo.src = 'logo1.png';
    loadingLogo.className = 'loading-logo';
    loadingLogo.alt = 'Loading...';
    loader.appendChild(loadingLogo);

    // Function to scroll to bottom silently
    function silentScroll() {
        return new Promise((resolve) => {
            // Create a hidden container that will handle the scroll
            const scrollContainer = document.createElement('div');
            scrollContainer.style.cssText = `
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                pointer-events: none;
                visibility: hidden;
                z-index: -1;
            `;
            document.body.appendChild(scrollContainer);

            const scrollHeight = Math.max(
                document.body.scrollHeight,
                document.documentElement.scrollHeight,
                document.body.offsetHeight,
                document.documentElement.offsetHeight
            );
            
            // Scroll smoothly to bottom in the background
            window.scrollTo({
                top: scrollHeight,
                behavior: 'smooth'
            });

            // Check when scrolling is complete
            let lastPos = window.scrollY;
            const checkScroll = setInterval(() => {
                if (window.scrollY === lastPos) {
                    clearInterval(checkScroll);
                    // Clean up
                    document.body.removeChild(scrollContainer);
                    resolve();
                }
                lastPos = window.scrollY;
            }, 50);
        });
    }

    // Function to show preloader
    function showPreloader() {
        return new Promise(resolve => {
            preloader.style.cssText = `
                display: flex;
                opacity: 1;
                z-index: 10000;
            `;
            setTimeout(resolve, 300);
        });
    }

    // Function to hide preloader
    function hidePreloader() {
        return new Promise(resolve => {
            preloader.style.opacity = '0';
            setTimeout(() => {
                preloader.style.display = 'none';
                resolve();
            }, 300);
        });
    }

    // Initial page load animation
    window.addEventListener('load', async function() {
        // Show preloader immediately
        await showPreloader();
        
        // Scroll silently in the background
        await silentScroll();
        
        // Quick scroll back to top (still behind preloader)
        window.scrollTo({
            top: 0,
            behavior: 'auto'
        });
        
        // Wait a bit then hide preloader
        setTimeout(async () => {
            await hidePreloader();
        }, 500);
    });

    // Handle link clicks
    document.addEventListener('click', async function(e) {
        const target = e.target.closest('a');
        if (!target) return;
        
        const href = target.getAttribute('href');
        if (!href || 
            target.getAttribute('target') === '_blank' || 
            target.classList.contains('no-loading') ||
            href.startsWith('#') ||
            href.startsWith('tel:') ||
            href.startsWith('mailto:') ||
            href.startsWith('http')) {
            return;
        }

        e.preventDefault();
        
        // Show preloader immediately
        await showPreloader();
        
        // Scroll silently in the background
        await silentScroll();
        
        // Quick scroll back to top (still behind preloader)
        window.scrollTo({
            top: 0,
            behavior: 'auto'
        });
        
        // Navigate to new page
        window.location.href = href;
    });
});
